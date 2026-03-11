json.extract! account, :id, :address, :country, :zip_code, :ssn, :mmn, :account_pin, :account_number, :routine_number, :dob, :slug, :balance, :occupation_address, :user_id, :created_at, :updated_at
json.url account_url(account, format: :json)
