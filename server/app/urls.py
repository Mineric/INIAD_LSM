"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include

from discuss import views as discuss_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path ('discuss/comments', discuss_views.CommentList.as_view()),
    path ('discuss/comments/<int:pk>', discuss_views.CommentRetrieveDestroy.as_view()),
    path ('discuss/comments/<int:pk>/vote', discuss_views.VoteCreate.as_view()),
    path ('api-auth/', include('rest_framework.urls')),
    path('', include ('api.urls')), # meant to be fixed
    path('', include ('discuss.urls')), # meant to be fixed

]
