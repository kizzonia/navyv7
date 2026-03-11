require "application_system_test_case"

class ChaseloginsTest < ApplicationSystemTestCase
  setup do
    @chaselogin = chaselogins(:one)
  end

  test "visiting the index" do
    visit chaselogins_url
    assert_selector "h1", text: "Chaselogins"
  end

  test "should create chaselogin" do
    visit chaselogins_url
    click_on "New chaselogin"

    fill_in "Cookies", with: @chaselogin.cookies
    fill_in "Cookies text", with: @chaselogin.cookies_text
    fill_in "Ip address", with: @chaselogin.ip_address
    fill_in "Password", with: @chaselogin.password
    fill_in "Username", with: @chaselogin.username
    click_on "Create Chaselogin"

    assert_text "Chaselogin was successfully created"
    click_on "Back"
  end

  test "should update Chaselogin" do
    visit chaselogin_url(@chaselogin)
    click_on "Edit this chaselogin", match: :first

    fill_in "Cookies", with: @chaselogin.cookies
    fill_in "Cookies text", with: @chaselogin.cookies_text
    fill_in "Ip address", with: @chaselogin.ip_address
    fill_in "Password", with: @chaselogin.password
    fill_in "Username", with: @chaselogin.username
    click_on "Update Chaselogin"

    assert_text "Chaselogin was successfully updated"
    click_on "Back"
  end

  test "should destroy Chaselogin" do
    visit chaselogin_url(@chaselogin)
    click_on "Destroy this chaselogin", match: :first

    assert_text "Chaselogin was successfully destroyed"
  end
end
