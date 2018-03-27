/*
 * Permutations.h
 *
 *  Created on: 19.11.2013
 *      Author: alexey slovesnov
 */

#ifndef PERMUTATIONS_H_
#define PERMUTATIONS_H_

/*
 * PermutationType
 * PERMUTATIONS_WITHOUT_REPLACEMENTS k-permutations of n without replacements. Number of combinations equals n!/(n-k)!
 * PERMUTATIONS_WITH_REPLACEMENTS k-permutations of n with replacements. Number of combinations equals n^k
 * COMBINATION k-combination of n items. Number of combinations equals n!/(n-k)!/k!
*/
enum PermutationType { PERMUTATIONS_WITHOUT_REPLACEMENTS, PERMUTATIONS_WITH_REPLACEMENTS, COMBINATION };

class Permutations {
	int k,n;
	PermutationType type;
	int*i,*a;
	int index;
	void free();

	//add index
	void add();

public:
	Permutations();
	Permutations(const int k,const int n,const PermutationType type);
	bool init(const int k,const int n,const PermutationType type);
	bool next();

	inline const int getK()const {
		return k;
	}

	inline const int getN()const {
		return n;
	}

	inline const int* getIndexes()const {
		return type==PERMUTATIONS_WITHOUT_REPLACEMENTS?a:i;
	}

	inline const int getIndex(const int i)const {
		return getIndexes()[i];
	}

	//return number of combinations
	const int number()const;

	virtual ~Permutations();
};

#endif /* PERMUTATIONS_H_ */
