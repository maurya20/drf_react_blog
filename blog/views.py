from .models import Blog
from .serializers import BlogSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth import get_user_model

User = get_user_model()



class Blogslist(APIView):
    permission_classes = []
    authentication_classes = []
    
    def get(self, request, format=None):
        qs = Blog.objects.all()
        serializer = BlogSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        qs = Blog.objects.all()
        serializer = BlogSerializer(qs, many=True)
        return Response(serializer.data)


class Blogdetail(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class Blogcreate(generics.CreateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class Blogupdate(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class Blogdelete(generics.DestroyAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer



class SignupView(APIView):
    permission_classes = []

    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        email = data["email"]
        password = data["password"]
        password2 = data["password2"]
        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({"error":"Email Already Exists!"})
            else:
                user = User.objects.create_user(username=username,email=email,password=password)
                user.save()
                return Response({"success":"A new user created sucessfully"})
        else:
            return Response({"error":"Password do not match"})
