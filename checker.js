const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let currentRequest = false;

function hookPasswordFields() {
    // $("input:password").on("input", changeListener);
    $("[type=password]").on("input", changeListener);
}

function statusNeutral(target) {
    target.removeClass("passwordCheckerStatusPass passwordCheckerStatusFail");
}

function statusPass(target) {
    target.removeClass("passwordCheckerStatusFail");
    target.addClass("passwordCheckerStatusPass");
}

function statusFail(target) {
    target.removeClass("passwordCheckerStatusPass");
    target.addClass("passwordCheckerStatusFail");
}

function changeListener(event) {
    let pswdField = $(event.target),
        val = pswdField.val();
    if (!val) {
        statusNeutral(pswdField);
    } else {
        statusNeutral(pswdField);
        let sha = sha1(val).toUpperCase(),
            shaPrefix = sha.substring(0, 5),
            shaSuffix = sha.substring(5);
        if (currentRequest) currentRequest.abort();
        currentRequest = $.get(
            "https://api.pwnedpasswords.com/range/" + shaPrefix,
            "",
            (data, textStatus, jqXHR) => {
                currentRequest = false;
                if (textStatus !== "success") {
                    alert("Something went wrong with the Password Breach Checker. Please contact the developer with details.");
                    return;
                }
                let results = data.split("\n");
                if (results.filter(x => x.split(":")[0] == shaSuffix).length) {
                    statusFail(pswdField);
                } else {
                    statusPass(pswdField);
                }
            }
        );
    }
}

let observer = new MutationObserver((mutations, observer) => {
    // This function fires whenever the
    hookPasswordFields();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
});

hookPasswordFields();
