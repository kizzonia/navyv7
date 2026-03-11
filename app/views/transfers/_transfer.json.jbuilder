json.extract! transfer, :id, :account_name, :account_number, :routine_number, :swift_code, :user_id, :bank_name, :amount, :status, :account_id, :slug, :notes, :country, :otp, :pin, :created_at, :updated_at
json.url transfer_url(transfer, format: :json)
