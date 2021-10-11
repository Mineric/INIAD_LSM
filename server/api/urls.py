from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register ('DashBoard', DashBoardViewSet, basename = 'DashBoard')
router.register ('Course', CourseViewSet, basename = 'Course')
urlpatterns = [
    path ('viewset/', include(router.urls)),
]
