from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
