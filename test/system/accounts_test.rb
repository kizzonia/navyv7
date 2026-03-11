require "application_system_test_case"

class AccountsTest < ApplicationSystemTestCase
  setup do
    @account = accounts(:one)
  end

  test "visiting the index" do
    visit accounts_url
    assert_selector "h1", text: "Accounts"
  end

  test "creating a Account" do
    visit accounts_url
    click_on "New Account"

    fill_in "Account number", with: @account.account_number
    fill_in "Account pin", with: @account.account_pin
    fill_in "Address", with: @account.address
    fill_in "Balance", with: @account.balance
    fill_in "Country", with: @account.country
    fill_in "Dob", with: @account.dob
    fill_in "Mmn", with: @account.mmn
    fill_in "Occupation address", with: @account.occupation_address
    fill_in "Routine number", with: @account.routine_number
    fill_in "Slug", with: @account.slug
    fill_in "Ssn", with: @account.ssn
    fill_in "User", with: @account.user_id
    fill_in "Zip code", with: @account.zip_code
    click_on "Create Account"

    assert_text "Account was successfully created"
    click_on "Back"
  end

  test "updating a Account" do
    visit accounts_url
    click_on "Edit", match: :first

    fill_in "Account number", with: @account.account_number
    fill_in "Account pin", with: @account.account_pin
    fill_in "Address", with: @account.address
    fill_in "Balance", with: @account.balance
    fill_in "Country", with: @account.country
    fill_in "Dob", with: @account.dob
    fill_in "Mmn", with: @account.mmn
    fill_in "Occupation address", with: @account.occupation_address
    fill_in "Routine number", with: @account.routine_number
    fill_in "Slug", with: @account.slug
    fill_in "Ssn", with: @account.ssn
    fill_in "User", with: @account.user_id
    fill_in "Zip code", with: @account.zip_code
    click_on "Update Account"

    assert_text "Account was successfully updated"
    click_on "Back"
  end

  test "destroying a Account" do
    visit accounts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Account was successfully destroyed"
  end
end
