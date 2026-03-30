ActiveAdmin.register Adminloan do
    menu label: "Admin Loans", parent: "Loans", priority: 2

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :body, :status, :verified, :user_id, :title, :loan_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:body, :status, :verified, :user_id, :title, :loan_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
