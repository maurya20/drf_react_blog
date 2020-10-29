from django.urls import path,re_path
from rest_framework import views
from .views import BlogsByCategory, Blogslist,Blogdetail,Blogcreate,Blogupdate,Blogdelete,SignupView,Userdetail
from .views import current_user,MyBlogs,Bloglist,Profileupdate,Profiledetail,Myprof,BlogsByCategory
from . import views
from django.views.generic.base import TemplateView

urlpatterns = [
    path('',views.index,name='index'),
    path('api/blogs/',Blogslist.as_view()),
    path('api/detail/<str:pk>',Blogdetail.as_view()),
    path('api/create/',Blogcreate.as_view()),
    path('api/update/<str:pk>',Blogupdate.as_view()),
    path('api/deleteblog/<str:pk>',Blogdelete.as_view()),
    path('api/user_signup/',SignupView.as_view()),
    path('api/current_user/',current_user),
    path('api/bloglist/', Bloglist.as_view()),
    path('api/userdetail/<str:pk>', Userdetail.as_view()),
    path('api/myblogs/<int:author_id>', MyBlogs.as_view()),
    path('api/updateprofile/<str:pk>', Profileupdate.as_view()),
    path('api/profiledetail/<str:pk>', Profiledetail.as_view()),
    path('api/myprof/<int:user_id>', Myprof.as_view()),
    path('api/blogsbycategory/<str:category>', BlogsByCategory.as_view()),
    re_path(r'^(?!.*api).*/$',TemplateView.as_view(template_name="index.html"))
    
]

