Rails.application.routes.draw do
    get "/up", to: proc { [200, {}, ["OK"]] }

  resources :chaselogins
  resources :adminloans
  resources :loans
  resources :packages
  get 'userorder', to: 'loans#userorder'

  resources :deposits
  resources :feedbacks
  resources :features
  resources :boards
  resources :headers
  resources :cards
  resources :bills
  resources :transfers do
    resources :otps
  end
  resources :transactions
  resources :contacts
  resources :accounts
  resources :banners
  resources :blogs
  resources :faqs
  resources :plans
  resources :sections
  resources :services
  resources :abouts
  # mount Ckeditor::Engine => '/ckeditor'
  resources :welcomes
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)


  authenticated :user do
    root 'accounts#index', as: "authenticated_root"
  end
    root "welcomes#index"

      # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
