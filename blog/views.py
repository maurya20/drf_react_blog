from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.models import Blog
from blog.serializers import BlogSerializer
from django.db import models
from rest_framework import viewsets
from django.http import JsonResponse
from django.shortcuts import render




def blogs_list(request):
    data = {
        "id": 5,
        "title": "bhalu",
        "category": "Electronics",
        "content": "sergemeyill dfhtfjtmk6u srgrernnse5h rgrerny",
        "created_on": "2020-09-21T10:07:42.274442Z",
        "author": 2
    }
    return JsonResponse(data)





class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().filter().order_by('-id')
    serializer_class = BlogSerializer



@api_view(["GET"])
def blogs(request):
    blogs = Blog.objects.all()
    if request.method == "GET":
        serializer = BlogSerializer(blogs)
        return Response(serializer.data)
