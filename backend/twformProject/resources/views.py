from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Resource
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
import os
from django.conf import settings

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def uploadResource(request):
    if request.method == 'POST':
        title = request.data.get('title')
        subject = request.data.get('subject') 
        file = request.data.get('file')

        if not title or not file:
            return Response({"error": "Title and file are required."}, status=status.HTTP_400_BAD_REQUEST)

        resource = Resource.objects.create(
            title=title,
            subject=subject,
            file=file,
            size=file.size
        )
        return Response({
            "message": "Resource uploaded successfully.",
            "resource_id": resource.resource_id
        }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny])
def getResources(request):
        resources = Resource.objects.all().order_by('resource_id')
        data = [
            {
                "resource_id": r.resource_id,
                "title": r.title,
                "subject": r.subject,
                "file_url": r.file.url,
                "size": r.size,
            } for r in resources
        ]
        return Response(data)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def deleteResource(request, resource_id):
    try:
        resource = Resource.objects.get(resource_id=resource_id)
        
        # Get file path before deletion
        file_path = resource.file.path
        
        # Delete the database record
        resource.delete()

        # Delete the actual file
        if os.path.exists(file_path):
            os.remove(file_path)

        return Response({"message": "Resource deleted successfully."}, status=status.HTTP_200_OK)
    except Resource.DoesNotExist:
        return Response({"error": "Resource not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

