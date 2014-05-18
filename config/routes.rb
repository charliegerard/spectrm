Sync::Application.routes.draw do
  root :to => 'pages#index'
  #root :to => 'users#index'
  get '/users' => 'users#index'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'
  post '/users' => 'users#create'

  get '/login' => 'pages#index'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  # get "users/create" => 'pages#index'
  # get "users/new"
  # get "users/edit"
  # get "users/show"
  # get "users/update"
  # get "users/destroy"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'


end
