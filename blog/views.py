from .models import Blog
from .serializers import BlogSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics



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