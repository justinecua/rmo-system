from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.files.uploadedfile import InMemoryUploadedFile

from .models import Articles, ArticleFiles
from base.models import College

@api_view(["POST"])
@permission_classes([AllowAny])
def submit_article(request):
    try:
        title = request.data.get("title")
        authors = request.data.getlist("authors[]")  
        emails = request.data.getlist("emails[]")
        abstract = request.data.get("abstract")
        keywords = request.data.getlist("keywords[]")
        college_id = request.data.get("college")
        pdf_file = request.FILES.get("file")
        status_value = request.data.get("status", "pending")  

        if not all([title, emails, abstract, pdf_file]):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        article = Articles.objects.create(
            title=title,
            authors=authors,
            emails=emails,
            abstract=abstract,
            keywords=keywords,
            college=College.objects.filter(college_id=college_id).first() if college_id else None,
            status=status_value
        )

        ArticleFiles.objects.create(
            article=article,
            pdf_path=pdf_file
        )

        return Response({
            "message": "Article submitted successfully.",
            "status": article.status
        }, status=status.HTTP_201_CREATED)


    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator
from django.db.models import Q

from .models import Articles, ArticleFiles
from base.models import College
from .serializer import ArticleSerializer, CollegeSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def submit_article(request):
    try:
        title = request.data.get("title")
        authors = request.data.getlist("authors[]")  
        emails = request.data.getlist("emails[]")
        abstract = request.data.get("abstract")
        keywords = request.data.getlist("keywords[]")
        college_id = request.data.get("college")
        pdf_file = request.FILES.get("file")
        status_value = request.data.get("status", "pending")  

        if not all([title, abstract, pdf_file]):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        article = Articles.objects.create(
            title=title,
            authors=authors,
            emails=emails,
            abstract=abstract,
            keywords=keywords,
            college=College.objects.filter(college_id=college_id).first() if college_id else None,
            status=status_value
        )

        ArticleFiles.objects.create(
            article=article,
            pdf_path=pdf_file
        )

        return Response({
            "message": "Article submitted successfully.",
            "status": article.status
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_articles(request):
    try:
        # Extract query params
        search_query = request.GET.get("search")
        college_id = request.GET.get("college_id")
        status_filter = request.GET.get("status")
        page_number = int(request.GET.get("page", 1))
        page_size = int(request.GET.get("page_size", 15))

        # Base queryset
        articles = Articles.objects.select_related("college").prefetch_related("articleFiles").order_by("-article_id")

        # Filters
        if status_filter:
            articles = articles.filter(status=status_filter.lower())

        if college_id:
            articles = articles.filter(college__college_id=college_id)

        if search_query:
            articles = articles.filter(
                Q(title__icontains=search_query) |
                Q(authors__icontains=search_query) |
                Q(keywords__icontains=search_query) |
                Q(abstract__icontains=search_query)
            )

        # Pagination
        paginator = Paginator(articles, page_size)
        page_obj = paginator.get_page(page_number)
        serializer = ArticleSerializer(page_obj, many=True)

        return Response({
            "data": serializer.data,
            "pagination": {
                "total_items": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_article_status(request, article_id):
    try:
        new_status = request.data.get('status')
        
        if not new_status:
            return Response({"error": "Status is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate status
        valid_statuses = [choice[0] for choice in Articles.STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {"error": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get and update article
        article = Articles.objects.get(article_id=article_id)
        article.status = new_status
        article.save()

        return Response({
            "message": "Article status updated successfully.",
            "status": article.status
        }, status=status.HTTP_200_OK)

    except Articles.DoesNotExist:
        return Response({"error": "Article not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_article_details(request, article_id):
    try:
        article = Articles.objects.select_related('college').prefetch_related('articleFiles').get(article_id=article_id)
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Articles.DoesNotExist:
        return Response({"error": "Article not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([AllowAny])  
def get_approved_articles(request):
    try:
        search_query = request.GET.get("search", "")
        college_id = request.GET.get("college_id")
        page_number = int(request.GET.get("page", 1))
        page_size = int(request.GET.get("page_size", 15))

        # Filter only approved articles
        articles = Articles.objects.filter(status="approved") \
            .select_related("college") \
            .prefetch_related("articleFiles") \
            .order_by("-article_id")

        if college_id:
            articles = articles.filter(college__college_id=college_id)

        if search_query:
            articles = articles.filter(
                Q(title__icontains=search_query) |
                Q(authors__icontains=search_query) |
                Q(keywords__icontains=search_query) |
                Q(abstract__icontains=search_query)
            )

        paginator = Paginator(articles, page_size)
        page_obj = paginator.get_page(page_number)
        serializer = ArticleSerializer(page_obj, many=True)

        return Response({
            "data": serializer.data,
            "pagination": {
                "total_items": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["GET"])
@permission_classes([AllowAny])
def get_related_articles(request, article_id):
    try:
        base_article = Articles.objects.get(article_id=article_id)
        related_articles = Articles.objects.filter(status="approved").exclude(article_id=article_id)
        keyword_filter = Q()
        for keyword in base_article.keywords:
            keyword_filter |= Q(keywords__icontains=keyword)

        college_filter = Q(college=base_article.college) if base_article.college else Q()
        related_articles = related_articles.filter(
            keyword_filter | college_filter
        ).distinct()

        related_articles = related_articles.select_related("college").prefetch_related("articleFiles")[:3]

        serializer = ArticleSerializer(related_articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Articles.DoesNotExist:
        return Response({"error": "Base article not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
