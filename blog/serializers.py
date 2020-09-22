from rest_framework import serializers
from .models import Blog, User
from django.contrib.auth.models import User, auth



class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        #fields = ['id', 'title', 'category', 'author', 'content', 'created_on']
        fields = "__all__"