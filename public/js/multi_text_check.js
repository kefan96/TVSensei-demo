function multi_test_check(t,s,v){ 
	/*name, label name, and button name must be unique*/ 
	/*t = name, s = label name, v = check button*/
	/*Checks to see if line selected contains "yes"*/

		
		var m,n,i,j,b,bool;

		
		
		m = document.getElementsByName(t);
		
		n = document.getElementsByName(s);
		
		b = document.getElementsByName(v);
	
		/*Reset the label colors*/
		for(j = 0; j<n.length; j++){
			n[j].className = "custom-control-label";
		}
		
		/*Check response, if correct success, else danger*/
		for(i = 0; i < m.length; i++){
			
			bool = m[i].getAttribute("multi_value");
			
			if((bool=="yes") && (m[i].checked)){
				n[i].className = "custom-control-label bg-success";
				b[0].className = "btn btn-lg btn-block btn-success";
				b[0].textContent = "Correct!";
			}else if(m[i].checked){
				n[i].className = "custom-control-label bg-danger";
				b[0].className = "btn btn-lg btn-block btn-danger";
				b[0].textContent = "Try Again";
			}
		}
	}