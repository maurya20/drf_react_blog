from rest_framework import serializers
from .models import Blog, User
from django.contrib.auth.models import User, auth



class BlogSerializer(serializers.ModelSerializer):
    author = User.objects.all()
    class Meta:
        model = Blog
        #fields = ['id', 'title', 'category', 'author', 'content', 'created_on']
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'