from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register ('Dashboard', DashBoardViewSet, basename = 'dashboard')
router.register ('Courses', CourseViewSet, basename = 'courses')
router.register ('Lessons', LessonViewSet, basename = 'lessons')
urlpatterns = [
    path ('viewset/', include(router.urls)),
]
# H: dev process for media files
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


from django.conf import settings
from django.conf.urls import url
if settings.DEBUG:
    urlpatterns += [
        url (r'^media/(?P<path>.*)$',
            serve,
            {'document_root': settings.MEDIA_ROOT,}),
    ]
    