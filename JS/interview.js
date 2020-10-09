window.onload = () => {
    let apply = document.getElementById("apply");
    let comment = document.getElementById("comment").innerHTML;
    let form = document.forms[0];
    sessionStorage.student = "{}";
    // if (sessionStorage.student) {
    //     let student = JSON.parse(sessionStorage.student);
    //     comment = sessionStorage.student.comment;
    //     for (let i in form.elements) {
    //         student[form.elements[i].value] = student[form.elements[i].name];
    //     }
    // } else {
    //     alert('这个人为什么会没有信息啊，快去问服务器管理员！！！');
    //     history.go(-1) || location.href = "http://www.baidu.com";
    // }

    apply.isClick = false;
    apply.onclick = function() {
        if (apply.isClick) {
            return;
        } else {
            let newStudent = {};
            apply.isClick = true;
            comment = document.getElementById("comment").value;
            for (let i in form.elements) {
                newStudent[form.elements[i].name] = newStudent[form.elements[i].value] || "";
            }
            newStudent['comment'] = comment;
            newStudent['interviewer'] = sessionStorage.interviewer;
            console.log(newStudent);
            let AjaxObject = new XMLHttpRequest();
            AjaxObject.open("post", "/interview", true);
            AjaxObject.onreadystatechange = function() {
                if (AjaxObject.readyState == 4 && AjaxObject.status == 4) {
                    if (AjaxObject.responseText == 1) {
                        alert("success!");
                        sessionStorage.removeItem('student');
                    } else {
                        apply.isClick = true;
                    }

                }
            }
            AjaxObject.send(sessionStorage.student);
        }
    }
}