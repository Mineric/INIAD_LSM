from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register ('TodoList', TaskViewSet, basename = 'TodoList')

urlpatterns = [
    path ('todo-viewset/', include(router.urls)),
]