package permutations;

public class Permutations {
	private int k,n;
	private PermutationType type;
	private int i[],a[];
	private int index;

	public Permutations(int k,int n,PermutationType type) {
		init(k,n,type);
	}

	public Permutations() {
	}

	public int number(){
		int i;
		int r=1;
		if(type==PermutationType.PERMUTATIONS_WITH_REPLACEMENTS){
			for(i=0;i<k;i++){
				r*=n;
			}
		}
		else{
			for(i=n-k+1;i<=n;i++){
				r*=i;
			}
			if(type==PermutationType.COMBINATION){
				for(i=2;i<=k;i++){
					r/=i;
				}
			}
		}
		return r;

	}

	public boolean init(int _k,int _n,PermutationType _type){
		if(_k<=0 || _n<=0){
			System.err.println("permutations. error n and k should be positive\n");
			return false;
		}
		if(_type!=PermutationType.PERMUTATIONS_WITH_REPLACEMENTS && _n<_k){
			System.err.println("permutations. error n<k\n");
			return false;
		}
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

	//add index
	private void add(){
		int j=index;
		int m,l;
		i[j]++;
		for(j++;j<k;j++){
			i[j] = type==PermutationType.COMBINATION ? i[j-1]+1 : 0;
		}

		if(type==PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS){
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

	public boolean next(){
		int l,j;
		for(j=k-1 ; j>=0 ; j--){
			if(type==PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS){
				l=j;
			}
			else if(type==PermutationType.PERMUTATIONS_WITH_REPLACEMENTS){
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
	
	public int getK(){
		return k;
	}

	public int getN(){
		return n;
	}

	public int[] getIndexes() {
		return type==PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS?a:i;
	}

	public int getIndex(int i){
		return getIndexes()[i];
	}


}
