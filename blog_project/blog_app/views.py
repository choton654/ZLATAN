from django.shortcuts import render
from django.views.generic import ListView,DetailView,TemplateView
from django.views.generic.edit import CreateView,UpdateView,DeleteView
from .models import  Post
from django.urls import  reverse_lazy


def join(request):
    return render(request, "join.html")

def game(request):
    return render(request, "pig_game.html")

class IndexView(TemplateView):
    template_name = "index.html"

class BlogListView(ListView):
    model = Post
    template_name = 'post_list.html'
    
class BlogDetailView(DetailView):
    model = Post
    template_name = 'post_detail.html'
    
class BlogCreateView(CreateView):
    model = Post
    template_name = "post_create.html"
    fields = '__all__'

class BlogUpdateView(UpdateView):
    model = Post
    template_name = "post_edit.html"
    fields = ['title','body']

class BlogDeleteView(DeleteView):
    model = Post
    template_name = "post_delete.html"
    success_url = reverse_lazy('post_list')
