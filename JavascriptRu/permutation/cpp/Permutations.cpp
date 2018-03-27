/*
 * Permutations.cpp
 *
 *  Created on: 19.11.2013
 *      Author: alexey slovesnov
 */

#include <stdio.h>
#include "Permutations.h"

Permutations::Permutations(const int k,const int n,PermutationType type) {
	a=i=0;
	init(k,n,type);
}

Permutations::Permutations() {
	a=i=0;
	index=k=n=0;
	type=COMBINATION;
}

const int Permutations::number()const{
	int i;
	int r=1;
	if(type==PERMUTATIONS_WITH_REPLACEMENTS){
		for(i=0;i<k;i++){
			r*=n;
		}
	}
	else if(type==COMBINATION){
		if(k==0){
			return 1;
		}

		/* for big n,k
		 * C(n,k)=n*C(n-1,k-1)/k
		 * C(n,k)=n*C(n-1,k-1)/k=(n/k)*(n-1/k-1)...(n-k+1/1)C(n-k,0); C(n-k,0)=1
		 */
		for(i=1;i<=k;i++){
			r*=n-k+i;
			r/=i;
		}
	}
	else{
		for(i=n-k+1;i<=n;i++){
			r*=i;
		}
	}
	return r;

}

bool Permutations::init(const int _k,const int _n,PermutationType _type){
	if(_k<=0 || _n<=0){
		printf("permutations. error n and k should be positive\n");
		return false;
	}
	if(_type!=PERMUTATIONS_WITH_REPLACEMENTS && _n<_k){
		printf("permutations. error n<k\n");
		return false;
	}
	free();
	n=_n;
	k=_k;
	type=_type;

	i=new int[k];
	a=new int[n];

	//init indexes
	index=0;
	i[0]=-1;
	add();

	return true;
}

void Permutations::add(){
	int j=index;
	int m,l;
	i[j]++;
	for(j++;j<k;j++){
		i[j] = type==COMBINATION ? i[j-1]+1 : 0;
	}

	if(type==PERMUTATIONS_WITHOUT_REPLACEMENTS){
		for(j=0;j<n;j++){
			a[j]=j;
		}
		for(j=0;j<k;j++){
			m=j+i[j];
			l=a[m];
			for( ; j!=k-1 && m>j ; m--){
				a[m]=a[m-1];
			}
			a[j]=l;
		}
	}

}

bool Permutations::next(){
	int l,j;
	for(j=k-1 ; j>=0 ; j--){
		if(type==PERMUTATIONS_WITHOUT_REPLACEMENTS){
			l=j;
		}
		else if(type==PERMUTATIONS_WITH_REPLACEMENTS){
			l=0;
		}
		else{
			l=k-1-j;
		}
		if(n-1!=i[j]+l){
			break;
		}
	}
	index=j;

	if(index==-1){
		return false;
	}
	add();
	return true;
}

void Permutations::free() {
	if(i){
		delete[]i;
		i=0;
	}
	if(a){
		delete[]a;
		a=0;
	}
}

Permutations::~Permutations() {
	free();
}

/**
 * maked as one function
 * counting k-permutations of n with/without replacements or k-combination of n items
 * for type=0 counting k-permutations of n without replacements. Number of combinations equals n!/(n-k)!
 * for type=1 counting k-permutations of n with replacements. Number of combinations equals n^k
 * for type=2 counting k-combination of n items. Number of combinations equals n!/(n-k)!/k!
 * for any permutation call f(permutationArray[],permutationArraySize=k) function
 */
/*
void permutations(int k,int n,int type,void (*f)(int*,int)){
	if(k<=0 || n<=0){
		printf("permutations. error n and k should be positive\n");
		return;
	}
	if(type<0 || type>2){
		printf("permutations. invalid argument type\n");
		return;
	}
	if(type!=1 && n<k){
		printf("permutations. error n<k\n");
		return;
	}
	int j,l,m;
	int *i=new int[k];
	int *a=new int[n];

	for(j=0,i[0]=-1 ; j!=-1 ; ){
		//next index set
		i[j]++;
		for(j++;j<k;j++){
			i[j] = type==2 ? i[j-1]+1 : 0;
		}

		if(type==0){
			for(j=0;j<n;j++){
				a[j]=j;
			}
			for(j=0;j<k;j++){
				m=j+i[j];
				l=a[m];
				for( ; j!=k-1 && m>j ; m--){
					a[m]=a[m-1];
				}
				a[j]=l;
			}
		}
		f(type==0?a:i,k);

		//find k for next index set
		for(j=k-1 ; j>=0 ; j--){
			if(type==0){
				l=j;
			}
			else if(type==1){
				l=0;
			}
			else{
				l=k-1-j;
			}
			if(n-1!=i[j]+l){
				break;
			}
		}
	}
	delete[]a;
	delete[]i;
}

*/

