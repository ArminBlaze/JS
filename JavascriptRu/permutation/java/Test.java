package permutations;

public class Test {

	public static void main(String[] args) {
		int i;
		
		Permutations p=new Permutations();
		for(PermutationType type:PermutationType.values()){
			p.init(2,4,type);
			System.out.format("combinations=%2d ",p.number());
			do{
				System.out.print("{");
				for(i=0;i<p.getK();i++){
					if(i!=0){
						System.out.print(" ");
					}
					System.out.print(p.getIndex(i));
				}
				System.out.print("}");
			}while(p.next());
			System.out.println();
		}

	}

}
