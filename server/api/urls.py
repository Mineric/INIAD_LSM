from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register ('Dashboard', DashBoardViewSet, basename = 'dashboard')
router.register ('Courses', CourseViewSet, basename = 'courses')
urlpatterns = [
    path ('viewset/', include(router.urls)),
]
