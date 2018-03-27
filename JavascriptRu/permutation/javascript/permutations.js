var PermutationType={
		PERMUTATIONS_WITHOUT_REPLACEMENTS:0,
		PERMUTATIONS_WITH_REPLACEMENTS:1,
		COMBINATION:2
}

function Permutations(k,n,type){
	if(k==undefined || n==undefined || type==undefined){
		return;
	}
	this.init(k,n,type);
};

Permutations.prototype.number=function(){
	var i;
	var r=1;
	if(this.type==PermutationType.PERMUTATIONS_WITH_REPLACEMENTS){
		for(i=0;i<this.k;i++){
			r*=this.n;
		}
	}
	else{
		for(i=this.n-this.k+1;i<=this.n;i++){
			r*=i;
		}
		if(this.type==PermutationType.COMBINATION){
			for(i=2;i<=this.k;i++){
				r/=i;
			}
		}
	}
	return r;

}

Permutations.prototype.init=function(_k,_n,_type){
	if(_k<=0 || _n<=0){
		alert("permutations. error n and k should be positive");
		return false;
	}
	if(_type!=PermutationType.PERMUTATIONS_WITH_REPLACEMENTS && _n<_k){
		alert("permutations. error n<k");
		return false;
	}
	this.n=_n;
	this.k=_k;
	this.type=_type;

	this.i=new Array(this.k);
	this.a=new Array(this.n);

	//init indexes
	this.index=0;
	this.i[0]=-1;
	this.add();

	return true;
}

Permutations.prototype.add=function(){
	var j=this.index;
	var m,l;
	this.i[j]++;
	for(j++;j<this.k;j++){
		this.i[j] = this.type==PermutationType.COMBINATION ? this.i[j-1]+1 : 0;
	}

	if(this.type==PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS){
		for(j=0;j<this.n;j++){
			this.a[j]=j;
		}
		for(j=0;j<this.k;j++){
			m=j+this.i[j];
			l=this.a[m];
			for( ; j!=this.k-1 && m>j ; m--){
				this.a[m]=this.a[m-1];
			}
			this.a[j]=l;
		}
	}
}

Permutations.prototype.next=function(){
	var l,j;
	for(j=this.k-1 ; j>=0 ; j--){
		if(this.type==PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS){
			l=j;
		}
		else if(this.type==PermutationType.PERMUTATIONS_WITH_REPLACEMENTS){
			l=0;
		}
		else{
			l=this.k-1-j;
		}
		if(this.n-1!=this.i[j]+l){
			break;
		}
	}
	this.index=j;

	if(this.index==-1){
		return false;
	}
	this.add();
	return true;
}

Permutations.prototype.getK=function(){
	return this.k;
}

Permutations.prototype.getN=function(){
	return this.n;
}

Permutations.prototype.getIndexes=function(){
	return this.type==PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS?this.a:this.i;
}

Permutations.prototype.getIndex=function(i){
	return this.getIndexes()[i];
}
