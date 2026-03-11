ActiveAdmin.register Card do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :name, :card_number, :cvv, :date, :slug, :status,
   :user_id, :card_type, :card_company, :arrivaltime, :cardimg, :address, :zipcode, :phone

  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :card_number, :cvv, :date, :slug, :status, :user_id, :card_type]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  form do |f|

     f.inputs do
  f.input :user_id, :label => 'Users', :as => :select, :collection => User.all.map{|u| ["#{u.email}, #{u.first_name}", u.id]}

       f.input :name, placeholder: "Card full name"
       f.input :card_number, placeholder: "Card number"
       f.input :cvv, placeholder: "Card cvv"
       f.input :date
       f.input :card_type, as: :select, :collection => ["Prepaid Debit Card", "Credit Card"]
       f.input :card_company, as: :select, :collection => ["MasterCard", "Visa"]

       f.input :address, placeholder: "Full Card Address"
       f.input :zipcode
       f.input :phone

       f.input :status

       f.input :cardimg, as: :file
     end
       f.submit :submit
     end
     controller do
            def find_resource
              scoped_collection.friendly.find(params[:id])
            end
          end
end
