chrome.storage.local.get(['isEnabled', 'loggedOutOwa'], function(result) {
    if(result.isEnabled && !result.loggedOutOwa) {        
        document.addEventListener('DOMContentLoaded', function() {
            if(document.getElementById('username') && document.getElementById('password')){
                chrome.runtime.sendMessage({cmd: 'get_user_data'}, function(result) {
                    if (!(result.asdf === undefined  || result.fdsa === undefined)) { 
                        chrome.runtime.sendMessage({cmd: "show_ok_badge", timeout: 2000})
                        chrome.runtime.sendMessage({cmd: "save_clicks", click_count: 1})
                        chrome.runtime.sendMessage({cmd: "perform_login"})    
                        document.getElementById('username').value = (result.asdf) + "@msx.tu-dresden.de"
                        document.getElementById('password').value = (result.fdsa)
                        document.getElementsByClassName('signinbutton')[0].click()
                    } else {
                        chrome.runtime.sendMessage({cmd: "no_login_data"});
                    }
                });
            }
            //detecting logout
            if(document.querySelectorAll('#nameDropDown_toolbar_UserName_DropDown > div:nth-child(3) > a')[0]) {
                document.querySelectorAll('#nameDropDown_toolbar_UserName_DropDown > div:nth-child(3) > a')[0].addEventListener('click', function() {
                    chrome.runtime.sendMessage({cmd:'logged_out', portal: 'loggedOutOwa'})
                })
            }
        })
        console.log('Auto Login to OWA.')
    }
    else if(result.loggedOutOwa) {
        chrome.storage.local.set({loggedOutOwa: false}, function() {})
    }
})

//detecting logout
document.addEventListener("DOMNodeInserted", function(e) {
    //select TU Dresden from selector
    console.log('inserted')
    if(document.querySelectorAll('body > div:last-child > div  > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(4) > div')[0]) {
        document.querySelectorAll('body > div:last-child > div  > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(4) > div')[0].addEventListener('click', function() {
            chrome.runtime.sendMessage({cmd:'logged_out', portal: 'loggedOutOwa'})
        })
    }
}, false);

