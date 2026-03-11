json.extract! bill, :id, :name, :service, :amount, :date, :user_id, :slug, :created_at, :updated_at
json.url bill_url(bill, format: :json)
