from .models import Blog
from .serializers import BlogSerializer
from rest_framework.views import APIView
from rest_framework.response import Response



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