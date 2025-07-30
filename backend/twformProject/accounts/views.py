
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from accounts.models import UserType
from accounts.serializer import UserTypeSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def get_userTypes(request):
    try:
        userTypes = UserType.objects.all()
        serializer = UserTypeSerializer(userTypes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except UserType.DoesNotExist:
        return Response({"error": " not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
