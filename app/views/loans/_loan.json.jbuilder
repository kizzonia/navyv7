json.extract! loan, :id, :business_name, :budget, :amount, :interest, :desc, :project_name, :project_size, :project_desc, :date, :name, :first_name, :last_name, :email, :slug, :user_id, :created_at, :updated_at
json.url loan_url(loan, format: :json)
