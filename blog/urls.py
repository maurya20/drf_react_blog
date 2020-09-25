from django.urls import path, include
from .views import Blogslist,Blogdetail,Blogcreate,Blogupdate,Blogdelete



urlpatterns = [
    path('blogs/',Blogslist.as_view()),
    path('detail/<str:pk>',Blogdetail.as_view()),
    path('create/',Blogcreate.as_view()),
    path('update/<str:pk>',Blogupdate.as_view()),
    path('delete/<str:pk>',Blogdelete.as_view()),
]