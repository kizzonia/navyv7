ActiveAdmin.register Welcome do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :logoimg, :title, :desc,  :section, :footer, :phone, :address, :loantitle, :loansummary, :loandesc, :loanfavimg


  #
  # or
  #
  # permit_params do
  #   permitted = [:logoimg, :title, :desc, :whatsapp, :ig, :ln, :section, :link, :footer, :phone, :address, :twitter, :telegram]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
     f.inputs do
      f.input :address, placeholder: "address"
      f.input :logoimg, as: :file
      f.input :footer, label: "email", placeholder: "footer description email"
      f.input :phone, placeholder: "phone"
      f.input :title, placeholder: "Seo tilte"
      f.input :desc, placeholder: "Google Description"

      f.input :section, placeholder: "Quick Summary"

      para "Loan SEO"
      f.input :loantitle
      f.input :loansummary
      f.input :loandesc

    end
    f.actions
  end
end
