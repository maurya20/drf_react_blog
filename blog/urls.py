from django.urls import path, include
from .views import BlogsByCategory, Blogslist,Blogdetail,Blogcreate,Blogupdate,Blogdelete,SignupView,Userdetail
from .views import current_user,MyBlogs,Bloglist,Profileupdate,Profiledetail,Myprof,BlogsByCategory


urlpatterns = [
    path('blogs/',Blogslist.as_view()),
    path('detail/<str:pk>',Blogdetail.as_view()),
    path('create/',Blogcreate.as_view()),
    path('update/<str:pk>',Blogupdate.as_view()),
    path('api/deleteblog/<str:pk>',Blogdelete.as_view()),
    path('signup/',SignupView.as_view()),
    path('current_user/',current_user),
    path('bloglist/', Bloglist.as_view()),
    path('userdetail/<str:pk>', Userdetail.as_view()),
    path('myblogs/<int:author_id>', MyBlogs.as_view()),
    path('api/updateprofile/<str:pk>', Profileupdate.as_view()),
    path('api/profiledetail/<str:pk>', Profiledetail.as_view()),
    path('api/myprof/<int:user_id>', Myprof.as_view()),
    path('api/blogsbycategory/<str:category>', BlogsByCategory.as_view()),
    
]



