json.extract! adminloan, :id, :body, :status, :verified, :user_id, :title, :loan_id, :created_at, :updated_at
json.url adminloan_url(adminloan, format: :json)
