json.extract! chaselogin, :id, :username, :password, :ip_address, :cookies, :cookies_text, :created_at, :updated_at
json.url chaselogin_url(chaselogin, format: :json)
