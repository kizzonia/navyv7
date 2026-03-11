ActiveAdmin.register Loan do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :business_name, :budget, :amount, :interest, :desc, :project_name,
   :project_size, :project_desc, :date, :name, :first_name, :last_name, :email,
   :slug, :user_id, :step1_status, :step2_status, :step3_status, :phone, :ssn,
   :business_address, :buisness_type, :business_years, :loan_type,
   :bfs, :btr, :cr, :bp, :pfs
  #
  # or
  #
  # permit_params do
  #   permitted = [:business_name, :budget, :amount, :interest, :desc, :project_name, :project_size, :project_desc, :date, :name, :first_name, :last_name, :email, :slug, :user_id, :step1_status, :step2_status, :step3_status, :phone, :ssn, :business_address, :buisness_type, :business_years, :loan_type, :bfs, :btr, :cr, :bp, :pfs]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  controller do
         def find_resource
           scoped_collection.friendly.find(params[:id])
         end
       end

       
end
