from django.urls import path
from .views import BlogListView,BlogDetailView,BlogCreateView,BlogUpdateView,BlogDeleteView,IndexView


urlpatterns = [
    path('post/<int:pk>/',BlogDetailView.as_view(),name='post_detail'),
    path('post/<int:pk>delete/',BlogDeleteView.as_view(),name='post_delete'),
    path('post/create/',BlogCreateView.as_view(),name='post_create'),
    path('post/<int:pk>/edit/',BlogUpdateView.as_view(),name='post_edit'),
    path('list/',BlogListView.as_view(),name='post_list'),
    path('',IndexView.as_view(),name='index')
]
