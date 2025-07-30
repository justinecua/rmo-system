from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Resource
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def uploadResource(request):
    if request.method == 'POST':
        title = request.data.get('title')
        file = request.data.get('file')

        if not title or not file:
            return Response({"error": "Title and file are required."}, status=status.HTTP_400_BAD_REQUEST)

        resource = Resource.objects.create(
            title=title,
            file=file,
            size=file.size
        )
        return Response({"message": "Resource uploaded successfully.", "resource_id": resource.resource_id}, status=status.HTTP_201_CREATED)

    elif request.method == 'GET':
        resources = Resource.objects.all().order_by('-resource_id')
        data = [
            {
                "resource_id": r.resource_id,
                "title": r.title,
                "file_url": r.file.url,
                "size": r.size,
            } for r in resources
        ]
        return Response(data)

@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny])
def getResources(request):
        resources = Resource.objects.all().order_by('-resource_id')
        data = [
            {
                "resource_id": r.resource_id,
                "title": r.title,
                "file_url": r.file.url,
                "size": r.size,
            } for r in resources
        ]
        return Response(data)
