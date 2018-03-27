#include <stdio.h>
#include "Permutations.h"

int main() {
	int i,k;
	PermutationType type[]={
			PERMUTATIONS_WITHOUT_REPLACEMENTS,
			PERMUTATIONS_WITH_REPLACEMENTS,
			COMBINATION
	};

	Permutations p;
	for(k=0;k<3;k++){
		p.init(2,4,type[k]);
		printf("combinations=%2d ",p.number());
		do{
			printf("{");
			for(i=0;i<p.getK();i++){
				if(i!=0){
					printf(" ");
				}
				printf("%d",p.getIndex(i));
			}
			printf("}");
		}while(p.next());
		printf("\n");
	}

	return 0;
}
