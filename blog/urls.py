from django.urls import path, include
from .views import Blogslist



urlpatterns = [
    path('blogs/',Blogslist.as_view()),
]