(function(){function E(H,G){this.insertId=H.lastInsertId;this.rowsAffected=H.rowsAffected;this.rows=new D(G);}E.prototype={insertId:null,rowsAffected:null,rows:null};function D(I){this.length=0;this._items=[];while(I.isValidRow()){var H={};for(var J=0,G=I.fieldCount();J<G;J++){H[I.fieldName(J)]=I.field(J);}this._items.push(H);this.length++;I.next();}}D.prototype={_items:null,length:null,item:function(G){return this._items[G];}};function C(H,G,I){this._db=H;this._error=false;}C.prototype={_db:null,executeSql:function(L,K,J,H){if(this._error){return;}try{var G=new E(this._db,this._db.execute(L,K));if(G&&J){J(this,G);}else{if(!G){this._error=true;if(H){H();}}}}catch(I){if(H){H();}this._error=true;}}};function F(G){this._db=G;}F.open=function(K,G,J){var H;try{H=google.gears.factory.create("beta.database");H.open(K);}catch(I){return false;}return new F(H);};F.prototype={transaction:function(J,G,H){this._db.execute("BEGIN TRANSACTION");var I=new C(this._db);J(I);if(I._error){this._db.execute("ROLLBACK");if(G){G(I);}}else{this._db.execute("COMMIT");if(H){H(I);}}}};var A={};function B(G){this._db=G;}B.open=function(L,G,J){var H;if(L in A){H=A[L];}else{try{H=openDatabase(L,"",J,200000);A[L]=H;}catch(K){return false;}}var I=new B(H);return I;};B.prototype={transaction:function(I,G,H){this._db.transaction.apply(this._db,arguments);}};mui=mui||{};mui.Storage=(function(){if(typeof openDatabase==="undefined"){return F;}return B;})();})();