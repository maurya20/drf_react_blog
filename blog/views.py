from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.models import Blog
from blog.serializers import BlogSerializer
from django.db import models



@api_view(["GET"])
def blogs(request):
    blogs = Blog.objects.all()
    if request.method == "GET":
        serializer = BlogSerializer(blogs)
        return Response(serializer.data)
