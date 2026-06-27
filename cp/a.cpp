#include <bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin >> t;
    while(t--){
        long long  a, b;
        cin >> a >> b;
        long long  maxi = max(a, b);
        long long  mini = min(a, b);
        if(maxi%mini!=0){
            cout << -1 << endl;
            continue;
        }
        if(maxi==mini){
            cout << 0 << endl;
            continue;
        }
        long long  div = maxi / mini;
        if (div & (div - 1)) {
          cout << -1 << "\n";
          continue;
      }
        long long  cnt = 0;
        while(div%8==0){
            cnt++;
            div = div / 8;
        }
        while(div%4==0){
            cnt++;
            div = div / 4;
        }
        while(div%2==0){
            cnt++;
            div = div / 2;
        }
        cout << cnt << endl;
    }
}
