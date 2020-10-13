from .models import Blog, Profile
from .serializers import BlogSerializer,ProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.generics import ListAPIView
from django.db import transaction
from rest_framework import generics, mixins, permissions
from rest_framework.parsers import MultiPartParser, FormParser



class Blogslist(APIView):
    permission_classes = ()
    authentication_classes = ()
    
    def get(self, request, format=None):
        qs = Blog.objects.all(id=id)
        serializer = BlogSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        qs = Blog.objects.all()
        serializer = BlogSerializer(qs, many=True)
        return Response(serializer.data)


class Bloglist(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class Blogdetail(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class Userdetail(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = User.objects.all()
    serializer_class = UserSerializer


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


class Blogdelete(generics.DestroyAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer



class SignupView(APIView):
    permission_classes = []

    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        email = data["email"]
        password = data["password"]
        password2 = data["password2"]
        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({"error":"Email Already Exists!"})
            else:
                user = User.objects.create_user(username=username,email=email,password=password)
                user.save()
                userprofile = Profile.objects.create(user_id=request.user.id)
                userprofile.save()
                return Response({"success":"A new user created sucessfully"})
        else:
            return Response({"error":"Password do not match"})





#for login


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)





class MyBlogs(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JSONWebTokenAuthentication]
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.filter(author_id=self.kwargs['author_id'])


class Profiledetail(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer




class Profileupdate(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []
    parser_classes = (FormParser, MultiPartParser)
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # def perform_update(self, serializer):
    #     file_obj = self.request.FILES['image']

    # def put(self, request, format=None):
    #     my_file = request.FILES['image']
    #     filename = '/tmp/myfile'
    #     with open(filename, 'wb+') as temp_file:
    #         for chunk in my_file.chunks():
    #             temp_file.write(chunk)

    #     my_saved_file = open(filename) #there you go

class Profilecreate(generics.CreateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer



class Myprof(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user_id=self.kwargs['user_id'])









# class UserProfileChangeAPIView(generics.RetrieveAPIView,
#                                mixins.DestroyModelMixin,
#                                mixins.UpdateModelMixin):
#     permission_classes = ()
#     serializer_class = ProfileSerializer
   

   
  

#     @transaction.atomic
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)

#     @transaction.atomic
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)

# class UserList(APIView):
#     """
#     Create a new user. It's called 'UserList' because normally we'd have a get
#     method here too, for retrieving a list of all User objects.
#     """

#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         serializer = UserSerializerWithToken(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




