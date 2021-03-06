Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#root"
  get '/userList', to: "pages#root"
  get '/spreadsheet', to: "pages#root"

  namespace :api do
    namespace :v1 do
      resources :user, only: [:index, :create, :destroy, :update]
      resources :row, only: [:index, :create, :destroy, :update]
      resources :column, only: [:index, :create, :destroy, :update]
    end
  end

  get '*path' => redirect('/')
end
