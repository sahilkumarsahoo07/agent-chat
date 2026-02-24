
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Assistant
 * 
 */
export type Assistant = $Result.DefaultSelection<Prisma.$AssistantPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model SharedChat
 * 
 */
export type SharedChat = $Result.DefaultSelection<Prisma.$SharedChatPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assistant`: Exposes CRUD operations for the **Assistant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assistants
    * const assistants = await prisma.assistant.findMany()
    * ```
    */
  get assistant(): Prisma.AssistantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sharedChat`: Exposes CRUD operations for the **SharedChat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SharedChats
    * const sharedChats = await prisma.sharedChat.findMany()
    * ```
    */
  get sharedChat(): Prisma.SharedChatDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Conversation: 'Conversation',
    Message: 'Message',
    Assistant: 'Assistant',
    Project: 'Project',
    SharedChat: 'SharedChat'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "conversation" | "message" | "assistant" | "project" | "sharedChat"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ConversationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ConversationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Assistant: {
        payload: Prisma.$AssistantPayload<ExtArgs>
        fields: Prisma.AssistantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssistantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssistantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          findFirst: {
            args: Prisma.AssistantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssistantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          findMany: {
            args: Prisma.AssistantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>[]
          }
          create: {
            args: Prisma.AssistantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          createMany: {
            args: Prisma.AssistantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssistantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          update: {
            args: Prisma.AssistantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          deleteMany: {
            args: Prisma.AssistantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssistantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssistantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          aggregate: {
            args: Prisma.AssistantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssistant>
          }
          groupBy: {
            args: Prisma.AssistantGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssistantGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AssistantFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AssistantAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AssistantCountArgs<ExtArgs>
            result: $Utils.Optional<AssistantCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ProjectFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ProjectAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      SharedChat: {
        payload: Prisma.$SharedChatPayload<ExtArgs>
        fields: Prisma.SharedChatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SharedChatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SharedChatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>
          }
          findFirst: {
            args: Prisma.SharedChatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SharedChatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>
          }
          findMany: {
            args: Prisma.SharedChatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>[]
          }
          create: {
            args: Prisma.SharedChatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>
          }
          createMany: {
            args: Prisma.SharedChatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SharedChatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>
          }
          update: {
            args: Prisma.SharedChatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>
          }
          deleteMany: {
            args: Prisma.SharedChatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SharedChatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SharedChatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedChatPayload>
          }
          aggregate: {
            args: Prisma.SharedChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSharedChat>
          }
          groupBy: {
            args: Prisma.SharedChatGroupByArgs<ExtArgs>
            result: $Utils.Optional<SharedChatGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SharedChatFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SharedChatAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SharedChatCountArgs<ExtArgs>
            result: $Utils.Optional<SharedChatCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    assistant?: AssistantOmit
    project?: ProjectOmit
    sharedChat?: SharedChatOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    conversations: number
    assistants: number
    projects: number
    sharedChats: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    assistants?: boolean | UserCountOutputTypeCountAssistantsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    sharedChats?: boolean | UserCountOutputTypeCountSharedChatsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssistantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSharedChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SharedChatWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    SharedChat: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    SharedChat?: boolean | ConversationCountOutputTypeCountSharedChatArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountSharedChatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SharedChatWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    conversations: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | ProjectCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    tokens: number | null
  }

  export type UserSumAggregateOutputType = {
    tokens: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    avatar: string | null
    plan: string | null
    tokens: number | null
    tokenResetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    avatar: string | null
    plan: string | null
    tokens: number | null
    tokenResetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    avatar: number
    plan: number
    tokens: number
    tokenResetDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    tokens?: true
  }

  export type UserSumAggregateInputType = {
    tokens?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    plan?: true
    tokens?: true
    tokenResetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    plan?: true
    tokens?: true
    tokenResetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    plan?: true
    tokens?: true
    tokenResetDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    avatar: string | null
    plan: string
    tokens: number
    tokenResetDate: Date
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    plan?: boolean
    tokens?: boolean
    tokenResetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    assistants?: boolean | User$assistantsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    sharedChats?: boolean | User$sharedChatsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    plan?: boolean
    tokens?: boolean
    tokenResetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "avatar" | "plan" | "tokens" | "tokenResetDate" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    assistants?: boolean | User$assistantsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    sharedChats?: boolean | User$sharedChatsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      assistants: Prisma.$AssistantPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      sharedChats: Prisma.$SharedChatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      avatar: string | null
      plan: string
      tokens: number
      tokenResetDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assistants<T extends User$assistantsArgs<ExtArgs> = {}>(args?: Subset<T, User$assistantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sharedChats<T extends User$sharedChatsArgs<ExtArgs> = {}>(args?: Subset<T, User$sharedChatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly plan: FieldRef<"User", 'String'>
    readonly tokens: FieldRef<"User", 'Int'>
    readonly tokenResetDate: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.assistants
   */
  export type User$assistantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    where?: AssistantWhereInput
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    cursor?: AssistantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.sharedChats
   */
  export type User$sharedChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    where?: SharedChatWhereInput
    orderBy?: SharedChatOrderByWithRelationInput | SharedChatOrderByWithRelationInput[]
    cursor?: SharedChatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SharedChatScalarFieldEnum | SharedChatScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    title: string | null
    modelId: string | null
    modelName: string | null
    isPinned: boolean | null
    assistantId: string | null
    isLocked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    projectId: string | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    modelId: string | null
    modelName: string | null
    isPinned: boolean | null
    assistantId: string | null
    isLocked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    projectId: string | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    title: number
    modelId: number
    modelName: number
    isPinned: number
    assistantId: number
    isLocked: number
    activePath: number
    createdAt: number
    updatedAt: number
    userId: number
    projectId: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    title?: true
    modelId?: true
    modelName?: true
    isPinned?: true
    assistantId?: true
    isLocked?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    projectId?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    title?: true
    modelId?: true
    modelName?: true
    isPinned?: true
    assistantId?: true
    isLocked?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    projectId?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    title?: true
    modelId?: true
    modelName?: true
    isPinned?: true
    assistantId?: true
    isLocked?: true
    activePath?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    projectId?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    title: string
    modelId: string | null
    modelName: string | null
    isPinned: boolean
    assistantId: string | null
    isLocked: boolean
    activePath: string[]
    createdAt: Date
    updatedAt: Date
    userId: string
    projectId: string | null
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    modelId?: boolean
    modelName?: boolean
    isPinned?: boolean
    assistantId?: boolean
    isLocked?: boolean
    activePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Conversation$projectArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    SharedChat?: boolean | Conversation$SharedChatArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>



  export type ConversationSelectScalar = {
    id?: boolean
    title?: boolean
    modelId?: boolean
    modelName?: boolean
    isPinned?: boolean
    assistantId?: boolean
    isLocked?: boolean
    activePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    projectId?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "modelId" | "modelName" | "isPinned" | "assistantId" | "isLocked" | "activePath" | "createdAt" | "updatedAt" | "userId" | "projectId", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Conversation$projectArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    SharedChat?: boolean | Conversation$SharedChatArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
      SharedChat: Prisma.$SharedChatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      modelId: string | null
      modelName: string | null
      isPinned: boolean
      assistantId: string | null
      isLocked: boolean
      activePath: string[]
      createdAt: Date
      updatedAt: Date
      userId: string
      projectId: string | null
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * @param {ConversationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const conversation = await prisma.conversation.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ConversationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Conversation.
     * @param {ConversationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const conversation = await prisma.conversation.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ConversationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends Conversation$projectArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    SharedChat<T extends Conversation$SharedChatArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$SharedChatArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly modelId: FieldRef<"Conversation", 'String'>
    readonly modelName: FieldRef<"Conversation", 'String'>
    readonly isPinned: FieldRef<"Conversation", 'Boolean'>
    readonly assistantId: FieldRef<"Conversation", 'String'>
    readonly isLocked: FieldRef<"Conversation", 'Boolean'>
    readonly activePath: FieldRef<"Conversation", 'String[]'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
    readonly userId: FieldRef<"Conversation", 'String'>
    readonly projectId: FieldRef<"Conversation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation findRaw
   */
  export type ConversationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Conversation aggregateRaw
   */
  export type ConversationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Conversation.project
   */
  export type Conversation$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.SharedChat
   */
  export type Conversation$SharedChatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    where?: SharedChatWhereInput
    orderBy?: SharedChatOrderByWithRelationInput | SharedChatOrderByWithRelationInput[]
    cursor?: SharedChatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SharedChatScalarFieldEnum | SharedChatScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    version: number | null
  }

  export type MessageSumAggregateOutputType = {
    version: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    role: string | null
    content: string | null
    reasoning: string | null
    modelName: string | null
    parentId: string | null
    version: number | null
    attachmentName: string | null
    attachmentType: string | null
    rating: string | null
    createdAt: Date | null
    conversationId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    role: string | null
    content: string | null
    reasoning: string | null
    modelName: string | null
    parentId: string | null
    version: number | null
    attachmentName: string | null
    attachmentType: string | null
    rating: string | null
    createdAt: Date | null
    conversationId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    role: number
    content: number
    reasoning: number
    modelName: number
    parentId: number
    siblingIds: number
    version: number
    attachmentName: number
    attachmentType: number
    sources: number
    rating: number
    createdAt: number
    conversationId: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    version?: true
  }

  export type MessageSumAggregateInputType = {
    version?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    role?: true
    content?: true
    reasoning?: true
    modelName?: true
    parentId?: true
    version?: true
    attachmentName?: true
    attachmentType?: true
    rating?: true
    createdAt?: true
    conversationId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    role?: true
    content?: true
    reasoning?: true
    modelName?: true
    parentId?: true
    version?: true
    attachmentName?: true
    attachmentType?: true
    rating?: true
    createdAt?: true
    conversationId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    role?: true
    content?: true
    reasoning?: true
    modelName?: true
    parentId?: true
    siblingIds?: true
    version?: true
    attachmentName?: true
    attachmentType?: true
    sources?: true
    rating?: true
    createdAt?: true
    conversationId?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    role: string
    content: string
    reasoning: string | null
    modelName: string | null
    parentId: string | null
    siblingIds: string[]
    version: number
    attachmentName: string | null
    attachmentType: string | null
    sources: JsonValue | null
    rating: string | null
    createdAt: Date
    conversationId: string
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    reasoning?: boolean
    modelName?: boolean
    parentId?: boolean
    siblingIds?: boolean
    version?: boolean
    attachmentName?: boolean
    attachmentType?: boolean
    sources?: boolean
    rating?: boolean
    createdAt?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>



  export type MessageSelectScalar = {
    id?: boolean
    role?: boolean
    content?: boolean
    reasoning?: boolean
    modelName?: boolean
    parentId?: boolean
    siblingIds?: boolean
    version?: boolean
    attachmentName?: boolean
    attachmentType?: boolean
    sources?: boolean
    rating?: boolean
    createdAt?: boolean
    conversationId?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "content" | "reasoning" | "modelName" | "parentId" | "siblingIds" | "version" | "attachmentName" | "attachmentType" | "sources" | "rating" | "createdAt" | "conversationId", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: string
      content: string
      reasoning: string | null
      modelName: string | null
      parentId: string | null
      siblingIds: string[]
      version: number
      attachmentName: string | null
      attachmentType: string | null
      sources: Prisma.JsonValue | null
      rating: string | null
      createdAt: Date
      conversationId: string
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * @param {MessageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const message = await prisma.message.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Message.
     * @param {MessageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const message = await prisma.message.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly reasoning: FieldRef<"Message", 'String'>
    readonly modelName: FieldRef<"Message", 'String'>
    readonly parentId: FieldRef<"Message", 'String'>
    readonly siblingIds: FieldRef<"Message", 'String[]'>
    readonly version: FieldRef<"Message", 'Int'>
    readonly attachmentName: FieldRef<"Message", 'String'>
    readonly attachmentType: FieldRef<"Message", 'String'>
    readonly sources: FieldRef<"Message", 'Json'>
    readonly rating: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly conversationId: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message findRaw
   */
  export type MessageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Message aggregateRaw
   */
  export type MessageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Assistant
   */

  export type AggregateAssistant = {
    _count: AssistantCountAggregateOutputType | null
    _avg: AssistantAvgAggregateOutputType | null
    _sum: AssistantSumAggregateOutputType | null
    _min: AssistantMinAggregateOutputType | null
    _max: AssistantMaxAggregateOutputType | null
  }

  export type AssistantAvgAggregateOutputType = {
    temperature: number | null
  }

  export type AssistantSumAggregateOutputType = {
    temperature: number | null
  }

  export type AssistantMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    instructions: string | null
    model: string | null
    temperature: number | null
    icon: string | null
    color: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AssistantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    instructions: string | null
    model: string | null
    temperature: number | null
    icon: string | null
    color: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AssistantCountAggregateOutputType = {
    id: number
    name: number
    description: number
    instructions: number
    model: number
    temperature: number
    icon: number
    color: number
    actions: number
    models: number
    isPublic: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type AssistantAvgAggregateInputType = {
    temperature?: true
  }

  export type AssistantSumAggregateInputType = {
    temperature?: true
  }

  export type AssistantMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    instructions?: true
    model?: true
    temperature?: true
    icon?: true
    color?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AssistantMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    instructions?: true
    model?: true
    temperature?: true
    icon?: true
    color?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AssistantCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    instructions?: true
    model?: true
    temperature?: true
    icon?: true
    color?: true
    actions?: true
    models?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type AssistantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assistant to aggregate.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assistants
    **/
    _count?: true | AssistantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssistantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssistantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssistantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssistantMaxAggregateInputType
  }

  export type GetAssistantAggregateType<T extends AssistantAggregateArgs> = {
        [P in keyof T & keyof AggregateAssistant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssistant[P]>
      : GetScalarType<T[P], AggregateAssistant[P]>
  }




  export type AssistantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantWhereInput
    orderBy?: AssistantOrderByWithAggregationInput | AssistantOrderByWithAggregationInput[]
    by: AssistantScalarFieldEnum[] | AssistantScalarFieldEnum
    having?: AssistantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssistantCountAggregateInputType | true
    _avg?: AssistantAvgAggregateInputType
    _sum?: AssistantSumAggregateInputType
    _min?: AssistantMinAggregateInputType
    _max?: AssistantMaxAggregateInputType
  }

  export type AssistantGroupByOutputType = {
    id: string
    name: string
    description: string | null
    instructions: string | null
    model: string
    temperature: number
    icon: string | null
    color: string | null
    actions: string[]
    models: string[]
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: AssistantCountAggregateOutputType | null
    _avg: AssistantAvgAggregateOutputType | null
    _sum: AssistantSumAggregateOutputType | null
    _min: AssistantMinAggregateOutputType | null
    _max: AssistantMaxAggregateOutputType | null
  }

  type GetAssistantGroupByPayload<T extends AssistantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssistantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssistantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssistantGroupByOutputType[P]>
            : GetScalarType<T[P], AssistantGroupByOutputType[P]>
        }
      >
    >


  export type AssistantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    instructions?: boolean
    model?: boolean
    temperature?: boolean
    icon?: boolean
    color?: boolean
    actions?: boolean
    models?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assistant"]>



  export type AssistantSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    instructions?: boolean
    model?: boolean
    temperature?: boolean
    icon?: boolean
    color?: boolean
    actions?: boolean
    models?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type AssistantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "instructions" | "model" | "temperature" | "icon" | "color" | "actions" | "models" | "isPublic" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["assistant"]>
  export type AssistantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AssistantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assistant"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      instructions: string | null
      model: string
      temperature: number
      icon: string | null
      color: string | null
      actions: string[]
      models: string[]
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["assistant"]>
    composites: {}
  }

  type AssistantGetPayload<S extends boolean | null | undefined | AssistantDefaultArgs> = $Result.GetResult<Prisma.$AssistantPayload, S>

  type AssistantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssistantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssistantCountAggregateInputType | true
    }

  export interface AssistantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assistant'], meta: { name: 'Assistant' } }
    /**
     * Find zero or one Assistant that matches the filter.
     * @param {AssistantFindUniqueArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssistantFindUniqueArgs>(args: SelectSubset<T, AssistantFindUniqueArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assistant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssistantFindUniqueOrThrowArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssistantFindUniqueOrThrowArgs>(args: SelectSubset<T, AssistantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assistant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantFindFirstArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssistantFindFirstArgs>(args?: SelectSubset<T, AssistantFindFirstArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assistant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantFindFirstOrThrowArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssistantFindFirstOrThrowArgs>(args?: SelectSubset<T, AssistantFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assistants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assistants
     * const assistants = await prisma.assistant.findMany()
     * 
     * // Get first 10 Assistants
     * const assistants = await prisma.assistant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assistantWithIdOnly = await prisma.assistant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssistantFindManyArgs>(args?: SelectSubset<T, AssistantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assistant.
     * @param {AssistantCreateArgs} args - Arguments to create a Assistant.
     * @example
     * // Create one Assistant
     * const Assistant = await prisma.assistant.create({
     *   data: {
     *     // ... data to create a Assistant
     *   }
     * })
     * 
     */
    create<T extends AssistantCreateArgs>(args: SelectSubset<T, AssistantCreateArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assistants.
     * @param {AssistantCreateManyArgs} args - Arguments to create many Assistants.
     * @example
     * // Create many Assistants
     * const assistant = await prisma.assistant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssistantCreateManyArgs>(args?: SelectSubset<T, AssistantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Assistant.
     * @param {AssistantDeleteArgs} args - Arguments to delete one Assistant.
     * @example
     * // Delete one Assistant
     * const Assistant = await prisma.assistant.delete({
     *   where: {
     *     // ... filter to delete one Assistant
     *   }
     * })
     * 
     */
    delete<T extends AssistantDeleteArgs>(args: SelectSubset<T, AssistantDeleteArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assistant.
     * @param {AssistantUpdateArgs} args - Arguments to update one Assistant.
     * @example
     * // Update one Assistant
     * const assistant = await prisma.assistant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssistantUpdateArgs>(args: SelectSubset<T, AssistantUpdateArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assistants.
     * @param {AssistantDeleteManyArgs} args - Arguments to filter Assistants to delete.
     * @example
     * // Delete a few Assistants
     * const { count } = await prisma.assistant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssistantDeleteManyArgs>(args?: SelectSubset<T, AssistantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assistants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assistants
     * const assistant = await prisma.assistant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssistantUpdateManyArgs>(args: SelectSubset<T, AssistantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assistant.
     * @param {AssistantUpsertArgs} args - Arguments to update or create a Assistant.
     * @example
     * // Update or create a Assistant
     * const assistant = await prisma.assistant.upsert({
     *   create: {
     *     // ... data to create a Assistant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assistant we want to update
     *   }
     * })
     */
    upsert<T extends AssistantUpsertArgs>(args: SelectSubset<T, AssistantUpsertArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assistants that matches the filter.
     * @param {AssistantFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const assistant = await prisma.assistant.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AssistantFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Assistant.
     * @param {AssistantAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const assistant = await prisma.assistant.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AssistantAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Assistants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantCountArgs} args - Arguments to filter Assistants to count.
     * @example
     * // Count the number of Assistants
     * const count = await prisma.assistant.count({
     *   where: {
     *     // ... the filter for the Assistants we want to count
     *   }
     * })
    **/
    count<T extends AssistantCountArgs>(
      args?: Subset<T, AssistantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssistantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assistant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssistantAggregateArgs>(args: Subset<T, AssistantAggregateArgs>): Prisma.PrismaPromise<GetAssistantAggregateType<T>>

    /**
     * Group by Assistant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssistantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssistantGroupByArgs['orderBy'] }
        : { orderBy?: AssistantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssistantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssistantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assistant model
   */
  readonly fields: AssistantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assistant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssistantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assistant model
   */
  interface AssistantFieldRefs {
    readonly id: FieldRef<"Assistant", 'String'>
    readonly name: FieldRef<"Assistant", 'String'>
    readonly description: FieldRef<"Assistant", 'String'>
    readonly instructions: FieldRef<"Assistant", 'String'>
    readonly model: FieldRef<"Assistant", 'String'>
    readonly temperature: FieldRef<"Assistant", 'Float'>
    readonly icon: FieldRef<"Assistant", 'String'>
    readonly color: FieldRef<"Assistant", 'String'>
    readonly actions: FieldRef<"Assistant", 'String[]'>
    readonly models: FieldRef<"Assistant", 'String[]'>
    readonly isPublic: FieldRef<"Assistant", 'Boolean'>
    readonly createdAt: FieldRef<"Assistant", 'DateTime'>
    readonly updatedAt: FieldRef<"Assistant", 'DateTime'>
    readonly userId: FieldRef<"Assistant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Assistant findUnique
   */
  export type AssistantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant findUniqueOrThrow
   */
  export type AssistantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant findFirst
   */
  export type AssistantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assistants.
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assistants.
     */
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * Assistant findFirstOrThrow
   */
  export type AssistantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assistants.
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assistants.
     */
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * Assistant findMany
   */
  export type AssistantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistants to fetch.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assistants.
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * Assistant create
   */
  export type AssistantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * The data needed to create a Assistant.
     */
    data: XOR<AssistantCreateInput, AssistantUncheckedCreateInput>
  }

  /**
   * Assistant createMany
   */
  export type AssistantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assistants.
     */
    data: AssistantCreateManyInput | AssistantCreateManyInput[]
  }

  /**
   * Assistant update
   */
  export type AssistantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * The data needed to update a Assistant.
     */
    data: XOR<AssistantUpdateInput, AssistantUncheckedUpdateInput>
    /**
     * Choose, which Assistant to update.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant updateMany
   */
  export type AssistantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assistants.
     */
    data: XOR<AssistantUpdateManyMutationInput, AssistantUncheckedUpdateManyInput>
    /**
     * Filter which Assistants to update
     */
    where?: AssistantWhereInput
    /**
     * Limit how many Assistants to update.
     */
    limit?: number
  }

  /**
   * Assistant upsert
   */
  export type AssistantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * The filter to search for the Assistant to update in case it exists.
     */
    where: AssistantWhereUniqueInput
    /**
     * In case the Assistant found by the `where` argument doesn't exist, create a new Assistant with this data.
     */
    create: XOR<AssistantCreateInput, AssistantUncheckedCreateInput>
    /**
     * In case the Assistant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssistantUpdateInput, AssistantUncheckedUpdateInput>
  }

  /**
   * Assistant delete
   */
  export type AssistantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter which Assistant to delete.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant deleteMany
   */
  export type AssistantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assistants to delete
     */
    where?: AssistantWhereInput
    /**
     * Limit how many Assistants to delete.
     */
    limit?: number
  }

  /**
   * Assistant findRaw
   */
  export type AssistantFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Assistant aggregateRaw
   */
  export type AssistantAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Assistant without action
   */
  export type AssistantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistant
     */
    omit?: AssistantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    instructions: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    instructions: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    instructions: number
    color: number
    icon: number
    createdAt: number
    updatedAt: number
    userId: number
    chatIds: number
    chatDetails: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    instructions?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    instructions?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    instructions?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    chatIds?: true
    chatDetails?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    instructions: string | null
    color: string | null
    icon: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    chatIds: string[]
    chatDetails: JsonValue | null
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    instructions?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    chatIds?: boolean
    chatDetails?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversations?: boolean | Project$conversationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>



  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    instructions?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    chatIds?: boolean
    chatDetails?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "instructions" | "color" | "icon" | "createdAt" | "updatedAt" | "userId" | "chatIds" | "chatDetails", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversations?: boolean | Project$conversationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      instructions: string | null
      color: string | null
      icon: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
      chatIds: string[]
      chatDetails: Prisma.JsonValue | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * @param {ProjectFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const project = await prisma.project.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ProjectFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Project.
     * @param {ProjectAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const project = await prisma.project.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ProjectAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversations<T extends Project$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly instructions: FieldRef<"Project", 'String'>
    readonly color: FieldRef<"Project", 'String'>
    readonly icon: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly userId: FieldRef<"Project", 'String'>
    readonly chatIds: FieldRef<"Project", 'String[]'>
    readonly chatDetails: FieldRef<"Project", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project findRaw
   */
  export type ProjectFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Project aggregateRaw
   */
  export type ProjectAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Project.conversations
   */
  export type Project$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model SharedChat
   */

  export type AggregateSharedChat = {
    _count: SharedChatCountAggregateOutputType | null
    _min: SharedChatMinAggregateOutputType | null
    _max: SharedChatMaxAggregateOutputType | null
  }

  export type SharedChatMinAggregateOutputType = {
    id: string | null
    shareToken: string | null
    isPublic: boolean | null
    isUsed: boolean | null
    usedBy: string | null
    expiresAt: Date | null
    creatorId: string | null
    createdAt: Date | null
    conversationId: string | null
  }

  export type SharedChatMaxAggregateOutputType = {
    id: string | null
    shareToken: string | null
    isPublic: boolean | null
    isUsed: boolean | null
    usedBy: string | null
    expiresAt: Date | null
    creatorId: string | null
    createdAt: Date | null
    conversationId: string | null
  }

  export type SharedChatCountAggregateOutputType = {
    id: number
    shareToken: number
    isPublic: number
    isUsed: number
    usedBy: number
    expiresAt: number
    creatorId: number
    createdAt: number
    conversationId: number
    _all: number
  }


  export type SharedChatMinAggregateInputType = {
    id?: true
    shareToken?: true
    isPublic?: true
    isUsed?: true
    usedBy?: true
    expiresAt?: true
    creatorId?: true
    createdAt?: true
    conversationId?: true
  }

  export type SharedChatMaxAggregateInputType = {
    id?: true
    shareToken?: true
    isPublic?: true
    isUsed?: true
    usedBy?: true
    expiresAt?: true
    creatorId?: true
    createdAt?: true
    conversationId?: true
  }

  export type SharedChatCountAggregateInputType = {
    id?: true
    shareToken?: true
    isPublic?: true
    isUsed?: true
    usedBy?: true
    expiresAt?: true
    creatorId?: true
    createdAt?: true
    conversationId?: true
    _all?: true
  }

  export type SharedChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SharedChat to aggregate.
     */
    where?: SharedChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedChats to fetch.
     */
    orderBy?: SharedChatOrderByWithRelationInput | SharedChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SharedChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedChats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SharedChats
    **/
    _count?: true | SharedChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SharedChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SharedChatMaxAggregateInputType
  }

  export type GetSharedChatAggregateType<T extends SharedChatAggregateArgs> = {
        [P in keyof T & keyof AggregateSharedChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSharedChat[P]>
      : GetScalarType<T[P], AggregateSharedChat[P]>
  }




  export type SharedChatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SharedChatWhereInput
    orderBy?: SharedChatOrderByWithAggregationInput | SharedChatOrderByWithAggregationInput[]
    by: SharedChatScalarFieldEnum[] | SharedChatScalarFieldEnum
    having?: SharedChatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SharedChatCountAggregateInputType | true
    _min?: SharedChatMinAggregateInputType
    _max?: SharedChatMaxAggregateInputType
  }

  export type SharedChatGroupByOutputType = {
    id: string
    shareToken: string
    isPublic: boolean
    isUsed: boolean
    usedBy: string | null
    expiresAt: Date | null
    creatorId: string
    createdAt: Date
    conversationId: string
    _count: SharedChatCountAggregateOutputType | null
    _min: SharedChatMinAggregateOutputType | null
    _max: SharedChatMaxAggregateOutputType | null
  }

  type GetSharedChatGroupByPayload<T extends SharedChatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SharedChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SharedChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SharedChatGroupByOutputType[P]>
            : GetScalarType<T[P], SharedChatGroupByOutputType[P]>
        }
      >
    >


  export type SharedChatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shareToken?: boolean
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: boolean
    expiresAt?: boolean
    creatorId?: boolean
    createdAt?: boolean
    conversationId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sharedChat"]>



  export type SharedChatSelectScalar = {
    id?: boolean
    shareToken?: boolean
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: boolean
    expiresAt?: boolean
    creatorId?: boolean
    createdAt?: boolean
    conversationId?: boolean
  }

  export type SharedChatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shareToken" | "isPublic" | "isUsed" | "usedBy" | "expiresAt" | "creatorId" | "createdAt" | "conversationId", ExtArgs["result"]["sharedChat"]>
  export type SharedChatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $SharedChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SharedChat"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shareToken: string
      isPublic: boolean
      isUsed: boolean
      usedBy: string | null
      expiresAt: Date | null
      creatorId: string
      createdAt: Date
      conversationId: string
    }, ExtArgs["result"]["sharedChat"]>
    composites: {}
  }

  type SharedChatGetPayload<S extends boolean | null | undefined | SharedChatDefaultArgs> = $Result.GetResult<Prisma.$SharedChatPayload, S>

  type SharedChatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SharedChatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SharedChatCountAggregateInputType | true
    }

  export interface SharedChatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SharedChat'], meta: { name: 'SharedChat' } }
    /**
     * Find zero or one SharedChat that matches the filter.
     * @param {SharedChatFindUniqueArgs} args - Arguments to find a SharedChat
     * @example
     * // Get one SharedChat
     * const sharedChat = await prisma.sharedChat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SharedChatFindUniqueArgs>(args: SelectSubset<T, SharedChatFindUniqueArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SharedChat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SharedChatFindUniqueOrThrowArgs} args - Arguments to find a SharedChat
     * @example
     * // Get one SharedChat
     * const sharedChat = await prisma.sharedChat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SharedChatFindUniqueOrThrowArgs>(args: SelectSubset<T, SharedChatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SharedChat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatFindFirstArgs} args - Arguments to find a SharedChat
     * @example
     * // Get one SharedChat
     * const sharedChat = await prisma.sharedChat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SharedChatFindFirstArgs>(args?: SelectSubset<T, SharedChatFindFirstArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SharedChat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatFindFirstOrThrowArgs} args - Arguments to find a SharedChat
     * @example
     * // Get one SharedChat
     * const sharedChat = await prisma.sharedChat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SharedChatFindFirstOrThrowArgs>(args?: SelectSubset<T, SharedChatFindFirstOrThrowArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SharedChats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SharedChats
     * const sharedChats = await prisma.sharedChat.findMany()
     * 
     * // Get first 10 SharedChats
     * const sharedChats = await prisma.sharedChat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sharedChatWithIdOnly = await prisma.sharedChat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SharedChatFindManyArgs>(args?: SelectSubset<T, SharedChatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SharedChat.
     * @param {SharedChatCreateArgs} args - Arguments to create a SharedChat.
     * @example
     * // Create one SharedChat
     * const SharedChat = await prisma.sharedChat.create({
     *   data: {
     *     // ... data to create a SharedChat
     *   }
     * })
     * 
     */
    create<T extends SharedChatCreateArgs>(args: SelectSubset<T, SharedChatCreateArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SharedChats.
     * @param {SharedChatCreateManyArgs} args - Arguments to create many SharedChats.
     * @example
     * // Create many SharedChats
     * const sharedChat = await prisma.sharedChat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SharedChatCreateManyArgs>(args?: SelectSubset<T, SharedChatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SharedChat.
     * @param {SharedChatDeleteArgs} args - Arguments to delete one SharedChat.
     * @example
     * // Delete one SharedChat
     * const SharedChat = await prisma.sharedChat.delete({
     *   where: {
     *     // ... filter to delete one SharedChat
     *   }
     * })
     * 
     */
    delete<T extends SharedChatDeleteArgs>(args: SelectSubset<T, SharedChatDeleteArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SharedChat.
     * @param {SharedChatUpdateArgs} args - Arguments to update one SharedChat.
     * @example
     * // Update one SharedChat
     * const sharedChat = await prisma.sharedChat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SharedChatUpdateArgs>(args: SelectSubset<T, SharedChatUpdateArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SharedChats.
     * @param {SharedChatDeleteManyArgs} args - Arguments to filter SharedChats to delete.
     * @example
     * // Delete a few SharedChats
     * const { count } = await prisma.sharedChat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SharedChatDeleteManyArgs>(args?: SelectSubset<T, SharedChatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SharedChats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SharedChats
     * const sharedChat = await prisma.sharedChat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SharedChatUpdateManyArgs>(args: SelectSubset<T, SharedChatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SharedChat.
     * @param {SharedChatUpsertArgs} args - Arguments to update or create a SharedChat.
     * @example
     * // Update or create a SharedChat
     * const sharedChat = await prisma.sharedChat.upsert({
     *   create: {
     *     // ... data to create a SharedChat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SharedChat we want to update
     *   }
     * })
     */
    upsert<T extends SharedChatUpsertArgs>(args: SelectSubset<T, SharedChatUpsertArgs<ExtArgs>>): Prisma__SharedChatClient<$Result.GetResult<Prisma.$SharedChatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SharedChats that matches the filter.
     * @param {SharedChatFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const sharedChat = await prisma.sharedChat.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SharedChatFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SharedChat.
     * @param {SharedChatAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const sharedChat = await prisma.sharedChat.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SharedChatAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SharedChats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatCountArgs} args - Arguments to filter SharedChats to count.
     * @example
     * // Count the number of SharedChats
     * const count = await prisma.sharedChat.count({
     *   where: {
     *     // ... the filter for the SharedChats we want to count
     *   }
     * })
    **/
    count<T extends SharedChatCountArgs>(
      args?: Subset<T, SharedChatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SharedChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SharedChat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SharedChatAggregateArgs>(args: Subset<T, SharedChatAggregateArgs>): Prisma.PrismaPromise<GetSharedChatAggregateType<T>>

    /**
     * Group by SharedChat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SharedChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SharedChatGroupByArgs['orderBy'] }
        : { orderBy?: SharedChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SharedChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSharedChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SharedChat model
   */
  readonly fields: SharedChatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SharedChat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SharedChatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SharedChat model
   */
  interface SharedChatFieldRefs {
    readonly id: FieldRef<"SharedChat", 'String'>
    readonly shareToken: FieldRef<"SharedChat", 'String'>
    readonly isPublic: FieldRef<"SharedChat", 'Boolean'>
    readonly isUsed: FieldRef<"SharedChat", 'Boolean'>
    readonly usedBy: FieldRef<"SharedChat", 'String'>
    readonly expiresAt: FieldRef<"SharedChat", 'DateTime'>
    readonly creatorId: FieldRef<"SharedChat", 'String'>
    readonly createdAt: FieldRef<"SharedChat", 'DateTime'>
    readonly conversationId: FieldRef<"SharedChat", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SharedChat findUnique
   */
  export type SharedChatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * Filter, which SharedChat to fetch.
     */
    where: SharedChatWhereUniqueInput
  }

  /**
   * SharedChat findUniqueOrThrow
   */
  export type SharedChatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * Filter, which SharedChat to fetch.
     */
    where: SharedChatWhereUniqueInput
  }

  /**
   * SharedChat findFirst
   */
  export type SharedChatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * Filter, which SharedChat to fetch.
     */
    where?: SharedChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedChats to fetch.
     */
    orderBy?: SharedChatOrderByWithRelationInput | SharedChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SharedChats.
     */
    cursor?: SharedChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedChats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SharedChats.
     */
    distinct?: SharedChatScalarFieldEnum | SharedChatScalarFieldEnum[]
  }

  /**
   * SharedChat findFirstOrThrow
   */
  export type SharedChatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * Filter, which SharedChat to fetch.
     */
    where?: SharedChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedChats to fetch.
     */
    orderBy?: SharedChatOrderByWithRelationInput | SharedChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SharedChats.
     */
    cursor?: SharedChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedChats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SharedChats.
     */
    distinct?: SharedChatScalarFieldEnum | SharedChatScalarFieldEnum[]
  }

  /**
   * SharedChat findMany
   */
  export type SharedChatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * Filter, which SharedChats to fetch.
     */
    where?: SharedChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedChats to fetch.
     */
    orderBy?: SharedChatOrderByWithRelationInput | SharedChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SharedChats.
     */
    cursor?: SharedChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedChats.
     */
    skip?: number
    distinct?: SharedChatScalarFieldEnum | SharedChatScalarFieldEnum[]
  }

  /**
   * SharedChat create
   */
  export type SharedChatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * The data needed to create a SharedChat.
     */
    data: XOR<SharedChatCreateInput, SharedChatUncheckedCreateInput>
  }

  /**
   * SharedChat createMany
   */
  export type SharedChatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SharedChats.
     */
    data: SharedChatCreateManyInput | SharedChatCreateManyInput[]
  }

  /**
   * SharedChat update
   */
  export type SharedChatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * The data needed to update a SharedChat.
     */
    data: XOR<SharedChatUpdateInput, SharedChatUncheckedUpdateInput>
    /**
     * Choose, which SharedChat to update.
     */
    where: SharedChatWhereUniqueInput
  }

  /**
   * SharedChat updateMany
   */
  export type SharedChatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SharedChats.
     */
    data: XOR<SharedChatUpdateManyMutationInput, SharedChatUncheckedUpdateManyInput>
    /**
     * Filter which SharedChats to update
     */
    where?: SharedChatWhereInput
    /**
     * Limit how many SharedChats to update.
     */
    limit?: number
  }

  /**
   * SharedChat upsert
   */
  export type SharedChatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * The filter to search for the SharedChat to update in case it exists.
     */
    where: SharedChatWhereUniqueInput
    /**
     * In case the SharedChat found by the `where` argument doesn't exist, create a new SharedChat with this data.
     */
    create: XOR<SharedChatCreateInput, SharedChatUncheckedCreateInput>
    /**
     * In case the SharedChat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SharedChatUpdateInput, SharedChatUncheckedUpdateInput>
  }

  /**
   * SharedChat delete
   */
  export type SharedChatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
    /**
     * Filter which SharedChat to delete.
     */
    where: SharedChatWhereUniqueInput
  }

  /**
   * SharedChat deleteMany
   */
  export type SharedChatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SharedChats to delete
     */
    where?: SharedChatWhereInput
    /**
     * Limit how many SharedChats to delete.
     */
    limit?: number
  }

  /**
   * SharedChat findRaw
   */
  export type SharedChatFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SharedChat aggregateRaw
   */
  export type SharedChatAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SharedChat without action
   */
  export type SharedChatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedChat
     */
    select?: SharedChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedChat
     */
    omit?: SharedChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedChatInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    avatar: 'avatar',
    plan: 'plan',
    tokens: 'tokens',
    tokenResetDate: 'tokenResetDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    modelId: 'modelId',
    modelName: 'modelName',
    isPinned: 'isPinned',
    assistantId: 'assistantId',
    isLocked: 'isLocked',
    activePath: 'activePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    projectId: 'projectId'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    role: 'role',
    content: 'content',
    reasoning: 'reasoning',
    modelName: 'modelName',
    parentId: 'parentId',
    siblingIds: 'siblingIds',
    version: 'version',
    attachmentName: 'attachmentName',
    attachmentType: 'attachmentType',
    sources: 'sources',
    rating: 'rating',
    createdAt: 'createdAt',
    conversationId: 'conversationId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AssistantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    instructions: 'instructions',
    model: 'model',
    temperature: 'temperature',
    icon: 'icon',
    color: 'color',
    actions: 'actions',
    models: 'models',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type AssistantScalarFieldEnum = (typeof AssistantScalarFieldEnum)[keyof typeof AssistantScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    instructions: 'instructions',
    color: 'color',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    chatIds: 'chatIds',
    chatDetails: 'chatDetails'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SharedChatScalarFieldEnum: {
    id: 'id',
    shareToken: 'shareToken',
    isPublic: 'isPublic',
    isUsed: 'isUsed',
    usedBy: 'usedBy',
    expiresAt: 'expiresAt',
    creatorId: 'creatorId',
    createdAt: 'createdAt',
    conversationId: 'conversationId'
  };

  export type SharedChatScalarFieldEnum = (typeof SharedChatScalarFieldEnum)[keyof typeof SharedChatScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    plan?: StringFilter<"User"> | string
    tokens?: IntFilter<"User"> | number
    tokenResetDate?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    conversations?: ConversationListRelationFilter
    assistants?: AssistantListRelationFilter
    projects?: ProjectListRelationFilter
    sharedChats?: SharedChatListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    plan?: SortOrder
    tokens?: SortOrder
    tokenResetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
    assistants?: AssistantOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    sharedChats?: SharedChatOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    plan?: StringFilter<"User"> | string
    tokens?: IntFilter<"User"> | number
    tokenResetDate?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    conversations?: ConversationListRelationFilter
    assistants?: AssistantListRelationFilter
    projects?: ProjectListRelationFilter
    sharedChats?: SharedChatListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    plan?: SortOrder
    tokens?: SortOrder
    tokenResetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    plan?: StringWithAggregatesFilter<"User"> | string
    tokens?: IntWithAggregatesFilter<"User"> | number
    tokenResetDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    modelId?: StringNullableFilter<"Conversation"> | string | null
    modelName?: StringNullableFilter<"Conversation"> | string | null
    isPinned?: BoolFilter<"Conversation"> | boolean
    assistantId?: StringNullableFilter<"Conversation"> | string | null
    isLocked?: BoolFilter<"Conversation"> | boolean
    activePath?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    userId?: StringFilter<"Conversation"> | string
    projectId?: StringNullableFilter<"Conversation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    messages?: MessageListRelationFilter
    SharedChat?: SharedChatListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    modelId?: SortOrder
    modelName?: SortOrder
    isPinned?: SortOrder
    assistantId?: SortOrder
    isLocked?: SortOrder
    activePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    SharedChat?: SharedChatOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    title?: StringFilter<"Conversation"> | string
    modelId?: StringNullableFilter<"Conversation"> | string | null
    modelName?: StringNullableFilter<"Conversation"> | string | null
    isPinned?: BoolFilter<"Conversation"> | boolean
    assistantId?: StringNullableFilter<"Conversation"> | string | null
    isLocked?: BoolFilter<"Conversation"> | boolean
    activePath?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    userId?: StringFilter<"Conversation"> | string
    projectId?: StringNullableFilter<"Conversation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    messages?: MessageListRelationFilter
    SharedChat?: SharedChatListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    modelId?: SortOrder
    modelName?: SortOrder
    isPinned?: SortOrder
    assistantId?: SortOrder
    isLocked?: SortOrder
    activePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    title?: StringWithAggregatesFilter<"Conversation"> | string
    modelId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    modelName?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    isPinned?: BoolWithAggregatesFilter<"Conversation"> | boolean
    assistantId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    isLocked?: BoolWithAggregatesFilter<"Conversation"> | boolean
    activePath?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    userId?: StringWithAggregatesFilter<"Conversation"> | string
    projectId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    reasoning?: StringNullableFilter<"Message"> | string | null
    modelName?: StringNullableFilter<"Message"> | string | null
    parentId?: StringNullableFilter<"Message"> | string | null
    siblingIds?: StringNullableListFilter<"Message">
    version?: IntFilter<"Message"> | number
    attachmentName?: StringNullableFilter<"Message"> | string | null
    attachmentType?: StringNullableFilter<"Message"> | string | null
    sources?: JsonNullableFilter<"Message">
    rating?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversationId?: StringFilter<"Message"> | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    reasoning?: SortOrder
    modelName?: SortOrder
    parentId?: SortOrder
    siblingIds?: SortOrder
    version?: SortOrder
    attachmentName?: SortOrder
    attachmentType?: SortOrder
    sources?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    reasoning?: StringNullableFilter<"Message"> | string | null
    modelName?: StringNullableFilter<"Message"> | string | null
    parentId?: StringNullableFilter<"Message"> | string | null
    siblingIds?: StringNullableListFilter<"Message">
    version?: IntFilter<"Message"> | number
    attachmentName?: StringNullableFilter<"Message"> | string | null
    attachmentType?: StringNullableFilter<"Message"> | string | null
    sources?: JsonNullableFilter<"Message">
    rating?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversationId?: StringFilter<"Message"> | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    reasoning?: SortOrder
    modelName?: SortOrder
    parentId?: SortOrder
    siblingIds?: SortOrder
    version?: SortOrder
    attachmentName?: SortOrder
    attachmentType?: SortOrder
    sources?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    reasoning?: StringNullableWithAggregatesFilter<"Message"> | string | null
    modelName?: StringNullableWithAggregatesFilter<"Message"> | string | null
    parentId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    siblingIds?: StringNullableListFilter<"Message">
    version?: IntWithAggregatesFilter<"Message"> | number
    attachmentName?: StringNullableWithAggregatesFilter<"Message"> | string | null
    attachmentType?: StringNullableWithAggregatesFilter<"Message"> | string | null
    sources?: JsonNullableWithAggregatesFilter<"Message">
    rating?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
  }

  export type AssistantWhereInput = {
    AND?: AssistantWhereInput | AssistantWhereInput[]
    OR?: AssistantWhereInput[]
    NOT?: AssistantWhereInput | AssistantWhereInput[]
    id?: StringFilter<"Assistant"> | string
    name?: StringFilter<"Assistant"> | string
    description?: StringNullableFilter<"Assistant"> | string | null
    instructions?: StringNullableFilter<"Assistant"> | string | null
    model?: StringFilter<"Assistant"> | string
    temperature?: FloatFilter<"Assistant"> | number
    icon?: StringNullableFilter<"Assistant"> | string | null
    color?: StringNullableFilter<"Assistant"> | string | null
    actions?: StringNullableListFilter<"Assistant">
    models?: StringNullableListFilter<"Assistant">
    isPublic?: BoolFilter<"Assistant"> | boolean
    createdAt?: DateTimeFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeFilter<"Assistant"> | Date | string
    userId?: StringFilter<"Assistant"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AssistantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    actions?: SortOrder
    models?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AssistantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssistantWhereInput | AssistantWhereInput[]
    OR?: AssistantWhereInput[]
    NOT?: AssistantWhereInput | AssistantWhereInput[]
    name?: StringFilter<"Assistant"> | string
    description?: StringNullableFilter<"Assistant"> | string | null
    instructions?: StringNullableFilter<"Assistant"> | string | null
    model?: StringFilter<"Assistant"> | string
    temperature?: FloatFilter<"Assistant"> | number
    icon?: StringNullableFilter<"Assistant"> | string | null
    color?: StringNullableFilter<"Assistant"> | string | null
    actions?: StringNullableListFilter<"Assistant">
    models?: StringNullableListFilter<"Assistant">
    isPublic?: BoolFilter<"Assistant"> | boolean
    createdAt?: DateTimeFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeFilter<"Assistant"> | Date | string
    userId?: StringFilter<"Assistant"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AssistantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    actions?: SortOrder
    models?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: AssistantCountOrderByAggregateInput
    _avg?: AssistantAvgOrderByAggregateInput
    _max?: AssistantMaxOrderByAggregateInput
    _min?: AssistantMinOrderByAggregateInput
    _sum?: AssistantSumOrderByAggregateInput
  }

  export type AssistantScalarWhereWithAggregatesInput = {
    AND?: AssistantScalarWhereWithAggregatesInput | AssistantScalarWhereWithAggregatesInput[]
    OR?: AssistantScalarWhereWithAggregatesInput[]
    NOT?: AssistantScalarWhereWithAggregatesInput | AssistantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assistant"> | string
    name?: StringWithAggregatesFilter<"Assistant"> | string
    description?: StringNullableWithAggregatesFilter<"Assistant"> | string | null
    instructions?: StringNullableWithAggregatesFilter<"Assistant"> | string | null
    model?: StringWithAggregatesFilter<"Assistant"> | string
    temperature?: FloatWithAggregatesFilter<"Assistant"> | number
    icon?: StringNullableWithAggregatesFilter<"Assistant"> | string | null
    color?: StringNullableWithAggregatesFilter<"Assistant"> | string | null
    actions?: StringNullableListFilter<"Assistant">
    models?: StringNullableListFilter<"Assistant">
    isPublic?: BoolWithAggregatesFilter<"Assistant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assistant"> | Date | string
    userId?: StringWithAggregatesFilter<"Assistant"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    instructions?: StringNullableFilter<"Project"> | string | null
    color?: StringNullableFilter<"Project"> | string | null
    icon?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    chatIds?: StringNullableListFilter<"Project">
    chatDetails?: JsonNullableFilter<"Project">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversations?: ConversationListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    instructions?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    chatIds?: SortOrder
    chatDetails?: SortOrder
    user?: UserOrderByWithRelationInput
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    instructions?: StringNullableFilter<"Project"> | string | null
    color?: StringNullableFilter<"Project"> | string | null
    icon?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    chatIds?: StringNullableListFilter<"Project">
    chatDetails?: JsonNullableFilter<"Project">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversations?: ConversationListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    instructions?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    chatIds?: SortOrder
    chatDetails?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    instructions?: StringNullableWithAggregatesFilter<"Project"> | string | null
    color?: StringNullableWithAggregatesFilter<"Project"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    userId?: StringWithAggregatesFilter<"Project"> | string
    chatIds?: StringNullableListFilter<"Project">
    chatDetails?: JsonNullableWithAggregatesFilter<"Project">
  }

  export type SharedChatWhereInput = {
    AND?: SharedChatWhereInput | SharedChatWhereInput[]
    OR?: SharedChatWhereInput[]
    NOT?: SharedChatWhereInput | SharedChatWhereInput[]
    id?: StringFilter<"SharedChat"> | string
    shareToken?: StringFilter<"SharedChat"> | string
    isPublic?: BoolFilter<"SharedChat"> | boolean
    isUsed?: BoolFilter<"SharedChat"> | boolean
    usedBy?: StringNullableFilter<"SharedChat"> | string | null
    expiresAt?: DateTimeNullableFilter<"SharedChat"> | Date | string | null
    creatorId?: StringFilter<"SharedChat"> | string
    createdAt?: DateTimeFilter<"SharedChat"> | Date | string
    conversationId?: StringFilter<"SharedChat"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type SharedChatOrderByWithRelationInput = {
    id?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    isUsed?: SortOrder
    usedBy?: SortOrder
    expiresAt?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
    creator?: UserOrderByWithRelationInput
    conversation?: ConversationOrderByWithRelationInput
  }

  export type SharedChatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shareToken?: string
    AND?: SharedChatWhereInput | SharedChatWhereInput[]
    OR?: SharedChatWhereInput[]
    NOT?: SharedChatWhereInput | SharedChatWhereInput[]
    isPublic?: BoolFilter<"SharedChat"> | boolean
    isUsed?: BoolFilter<"SharedChat"> | boolean
    usedBy?: StringNullableFilter<"SharedChat"> | string | null
    expiresAt?: DateTimeNullableFilter<"SharedChat"> | Date | string | null
    creatorId?: StringFilter<"SharedChat"> | string
    createdAt?: DateTimeFilter<"SharedChat"> | Date | string
    conversationId?: StringFilter<"SharedChat"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id" | "shareToken">

  export type SharedChatOrderByWithAggregationInput = {
    id?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    isUsed?: SortOrder
    usedBy?: SortOrder
    expiresAt?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
    _count?: SharedChatCountOrderByAggregateInput
    _max?: SharedChatMaxOrderByAggregateInput
    _min?: SharedChatMinOrderByAggregateInput
  }

  export type SharedChatScalarWhereWithAggregatesInput = {
    AND?: SharedChatScalarWhereWithAggregatesInput | SharedChatScalarWhereWithAggregatesInput[]
    OR?: SharedChatScalarWhereWithAggregatesInput[]
    NOT?: SharedChatScalarWhereWithAggregatesInput | SharedChatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SharedChat"> | string
    shareToken?: StringWithAggregatesFilter<"SharedChat"> | string
    isPublic?: BoolWithAggregatesFilter<"SharedChat"> | boolean
    isUsed?: BoolWithAggregatesFilter<"SharedChat"> | boolean
    usedBy?: StringNullableWithAggregatesFilter<"SharedChat"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"SharedChat"> | Date | string | null
    creatorId?: StringWithAggregatesFilter<"SharedChat"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SharedChat"> | Date | string
    conversationId?: StringWithAggregatesFilter<"SharedChat"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    assistants?: AssistantCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    assistants?: AssistantUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    assistants?: AssistantUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    assistants?: AssistantUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    SharedChat?: SharedChatCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    projectId?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    SharedChat?: SharedChatUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    SharedChat?: SharedChatUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    SharedChat?: SharedChatUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    projectId?: string | null
  }

  export type ConversationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    reasoning?: string | null
    modelName?: string | null
    parentId?: string | null
    siblingIds?: MessageCreatesiblingIdsInput | string[]
    version?: number
    attachmentName?: string | null
    attachmentType?: string | null
    sources?: InputJsonValue | null
    rating?: string | null
    createdAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    role: string
    content: string
    reasoning?: string | null
    modelName?: string | null
    parentId?: string | null
    siblingIds?: MessageCreatesiblingIdsInput | string[]
    version?: number
    attachmentName?: string | null
    attachmentType?: string | null
    sources?: InputJsonValue | null
    rating?: string | null
    createdAt?: Date | string
    conversationId: string
  }

  export type MessageUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyInput = {
    id?: string
    role: string
    content: string
    reasoning?: string | null
    modelName?: string | null
    parentId?: string | null
    siblingIds?: MessageCreatesiblingIdsInput | string[]
    version?: number
    attachmentName?: string | null
    attachmentType?: string | null
    sources?: InputJsonValue | null
    rating?: string | null
    createdAt?: Date | string
    conversationId: string
  }

  export type MessageUpdateManyMutationInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type AssistantCreateInput = {
    id?: string
    name: string
    description?: string | null
    instructions?: string | null
    model?: string
    temperature?: number
    icon?: string | null
    color?: string | null
    actions?: AssistantCreateactionsInput | string[]
    models?: AssistantCreatemodelsInput | string[]
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssistantsInput
  }

  export type AssistantUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    instructions?: string | null
    model?: string
    temperature?: number
    icon?: string | null
    color?: string | null
    actions?: AssistantCreateactionsInput | string[]
    models?: AssistantCreatemodelsInput | string[]
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AssistantUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssistantsNestedInput
  }

  export type AssistantUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AssistantCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    instructions?: string | null
    model?: string
    temperature?: number
    icon?: string | null
    color?: string | null
    actions?: AssistantCreateactionsInput | string[]
    models?: AssistantCreatemodelsInput | string[]
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AssistantUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
    user: UserCreateNestedOneWithoutProjectsInput
    conversations?: ConversationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    conversations?: ConversationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
    conversations?: ConversationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
  }

  export type ProjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
  }

  export type SharedChatCreateInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutSharedChatsInput
    conversation: ConversationCreateNestedOneWithoutSharedChatInput
  }

  export type SharedChatUncheckedCreateInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    creatorId: string
    createdAt?: Date | string
    conversationId: string
  }

  export type SharedChatUpdateInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutSharedChatsNestedInput
    conversation?: ConversationUpdateOneRequiredWithoutSharedChatNestedInput
  }

  export type SharedChatUncheckedUpdateInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type SharedChatCreateManyInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    creatorId: string
    createdAt?: Date | string
    conversationId: string
  }

  export type SharedChatUpdateManyMutationInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedChatUncheckedUpdateManyInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type AssistantListRelationFilter = {
    every?: AssistantWhereInput
    some?: AssistantWhereInput
    none?: AssistantWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SharedChatListRelationFilter = {
    every?: SharedChatWhereInput
    some?: SharedChatWhereInput
    none?: SharedChatWhereInput
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssistantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SharedChatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    plan?: SortOrder
    tokens?: SortOrder
    tokenResetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    tokens?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    plan?: SortOrder
    tokens?: SortOrder
    tokenResetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    plan?: SortOrder
    tokens?: SortOrder
    tokenResetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    tokens?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    modelId?: SortOrder
    modelName?: SortOrder
    isPinned?: SortOrder
    assistantId?: SortOrder
    isLocked?: SortOrder
    activePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    modelId?: SortOrder
    modelName?: SortOrder
    isPinned?: SortOrder
    assistantId?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    modelId?: SortOrder
    modelName?: SortOrder
    isPinned?: SortOrder
    assistantId?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    reasoning?: SortOrder
    modelName?: SortOrder
    parentId?: SortOrder
    siblingIds?: SortOrder
    version?: SortOrder
    attachmentName?: SortOrder
    attachmentType?: SortOrder
    sources?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    reasoning?: SortOrder
    modelName?: SortOrder
    parentId?: SortOrder
    version?: SortOrder
    attachmentName?: SortOrder
    attachmentType?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    reasoning?: SortOrder
    modelName?: SortOrder
    parentId?: SortOrder
    version?: SortOrder
    attachmentName?: SortOrder
    attachmentType?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    version?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AssistantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    actions?: SortOrder
    models?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AssistantAvgOrderByAggregateInput = {
    temperature?: SortOrder
  }

  export type AssistantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AssistantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AssistantSumOrderByAggregateInput = {
    temperature?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    instructions?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    chatIds?: SortOrder
    chatDetails?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    instructions?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    instructions?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type SharedChatCountOrderByAggregateInput = {
    id?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    isUsed?: SortOrder
    usedBy?: SortOrder
    expiresAt?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type SharedChatMaxOrderByAggregateInput = {
    id?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    isUsed?: SortOrder
    usedBy?: SortOrder
    expiresAt?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type SharedChatMinOrderByAggregateInput = {
    id?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    isUsed?: SortOrder
    usedBy?: SortOrder
    expiresAt?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type AssistantCreateNestedManyWithoutUserInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SharedChatCreateNestedManyWithoutCreatorInput = {
    create?: XOR<SharedChatCreateWithoutCreatorInput, SharedChatUncheckedCreateWithoutCreatorInput> | SharedChatCreateWithoutCreatorInput[] | SharedChatUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutCreatorInput | SharedChatCreateOrConnectWithoutCreatorInput[]
    createMany?: SharedChatCreateManyCreatorInputEnvelope
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type AssistantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SharedChatUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<SharedChatCreateWithoutCreatorInput, SharedChatUncheckedCreateWithoutCreatorInput> | SharedChatCreateWithoutCreatorInput[] | SharedChatUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutCreatorInput | SharedChatCreateOrConnectWithoutCreatorInput[]
    createMany?: SharedChatCreateManyCreatorInputEnvelope
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type AssistantUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    upsert?: AssistantUpsertWithWhereUniqueWithoutUserInput | AssistantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    set?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    disconnect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    delete?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    update?: AssistantUpdateWithWhereUniqueWithoutUserInput | AssistantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssistantUpdateManyWithWhereWithoutUserInput | AssistantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SharedChatUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<SharedChatCreateWithoutCreatorInput, SharedChatUncheckedCreateWithoutCreatorInput> | SharedChatCreateWithoutCreatorInput[] | SharedChatUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutCreatorInput | SharedChatCreateOrConnectWithoutCreatorInput[]
    upsert?: SharedChatUpsertWithWhereUniqueWithoutCreatorInput | SharedChatUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: SharedChatCreateManyCreatorInputEnvelope
    set?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    disconnect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    delete?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    update?: SharedChatUpdateWithWhereUniqueWithoutCreatorInput | SharedChatUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: SharedChatUpdateManyWithWhereWithoutCreatorInput | SharedChatUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: SharedChatScalarWhereInput | SharedChatScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type AssistantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    upsert?: AssistantUpsertWithWhereUniqueWithoutUserInput | AssistantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    set?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    disconnect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    delete?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    update?: AssistantUpdateWithWhereUniqueWithoutUserInput | AssistantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssistantUpdateManyWithWhereWithoutUserInput | AssistantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SharedChatUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<SharedChatCreateWithoutCreatorInput, SharedChatUncheckedCreateWithoutCreatorInput> | SharedChatCreateWithoutCreatorInput[] | SharedChatUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutCreatorInput | SharedChatCreateOrConnectWithoutCreatorInput[]
    upsert?: SharedChatUpsertWithWhereUniqueWithoutCreatorInput | SharedChatUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: SharedChatCreateManyCreatorInputEnvelope
    set?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    disconnect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    delete?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    update?: SharedChatUpdateWithWhereUniqueWithoutCreatorInput | SharedChatUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: SharedChatUpdateManyWithWhereWithoutCreatorInput | SharedChatUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: SharedChatScalarWhereInput | SharedChatScalarWhereInput[]
  }

  export type ConversationCreateactivePathInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutConversationsInput = {
    create?: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConversationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type SharedChatCreateNestedManyWithoutConversationInput = {
    create?: XOR<SharedChatCreateWithoutConversationInput, SharedChatUncheckedCreateWithoutConversationInput> | SharedChatCreateWithoutConversationInput[] | SharedChatUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutConversationInput | SharedChatCreateOrConnectWithoutConversationInput[]
    createMany?: SharedChatCreateManyConversationInputEnvelope
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type SharedChatUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<SharedChatCreateWithoutConversationInput, SharedChatUncheckedCreateWithoutConversationInput> | SharedChatCreateWithoutConversationInput[] | SharedChatUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutConversationInput | SharedChatCreateOrConnectWithoutConversationInput[]
    createMany?: SharedChatCreateManyConversationInputEnvelope
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConversationUpdateactivePathInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type ProjectUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConversationsInput
    upsert?: ProjectUpsertWithoutConversationsInput
    disconnect?: boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutConversationsInput, ProjectUpdateWithoutConversationsInput>, ProjectUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type SharedChatUpdateManyWithoutConversationNestedInput = {
    create?: XOR<SharedChatCreateWithoutConversationInput, SharedChatUncheckedCreateWithoutConversationInput> | SharedChatCreateWithoutConversationInput[] | SharedChatUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutConversationInput | SharedChatCreateOrConnectWithoutConversationInput[]
    upsert?: SharedChatUpsertWithWhereUniqueWithoutConversationInput | SharedChatUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: SharedChatCreateManyConversationInputEnvelope
    set?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    disconnect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    delete?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    update?: SharedChatUpdateWithWhereUniqueWithoutConversationInput | SharedChatUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: SharedChatUpdateManyWithWhereWithoutConversationInput | SharedChatUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: SharedChatScalarWhereInput | SharedChatScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type SharedChatUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<SharedChatCreateWithoutConversationInput, SharedChatUncheckedCreateWithoutConversationInput> | SharedChatCreateWithoutConversationInput[] | SharedChatUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedChatCreateOrConnectWithoutConversationInput | SharedChatCreateOrConnectWithoutConversationInput[]
    upsert?: SharedChatUpsertWithWhereUniqueWithoutConversationInput | SharedChatUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: SharedChatCreateManyConversationInputEnvelope
    set?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    disconnect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    delete?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    connect?: SharedChatWhereUniqueInput | SharedChatWhereUniqueInput[]
    update?: SharedChatUpdateWithWhereUniqueWithoutConversationInput | SharedChatUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: SharedChatUpdateManyWithWhereWithoutConversationInput | SharedChatUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: SharedChatScalarWhereInput | SharedChatScalarWhereInput[]
  }

  export type MessageCreatesiblingIdsInput = {
    set: string[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type MessageUpdatesiblingIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type AssistantCreateactionsInput = {
    set: string[]
  }

  export type AssistantCreatemodelsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAssistantsInput = {
    create?: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssistantsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssistantUpdateactionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AssistantUpdatemodelsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutAssistantsNestedInput = {
    create?: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssistantsInput
    upsert?: UserUpsertWithoutAssistantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssistantsInput, UserUpdateWithoutAssistantsInput>, UserUncheckedUpdateWithoutAssistantsInput>
  }

  export type ProjectCreatechatIdsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationCreateNestedManyWithoutProjectInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ProjectUpdatechatIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ConversationUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutProjectInput | ConversationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutProjectInput | ConversationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutProjectInput | ConversationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutProjectInput | ConversationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutProjectInput | ConversationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutProjectInput | ConversationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSharedChatsInput = {
    create?: XOR<UserCreateWithoutSharedChatsInput, UserUncheckedCreateWithoutSharedChatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSharedChatsInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationCreateNestedOneWithoutSharedChatInput = {
    create?: XOR<ConversationCreateWithoutSharedChatInput, ConversationUncheckedCreateWithoutSharedChatInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutSharedChatInput
    connect?: ConversationWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutSharedChatsNestedInput = {
    create?: XOR<UserCreateWithoutSharedChatsInput, UserUncheckedCreateWithoutSharedChatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSharedChatsInput
    upsert?: UserUpsertWithoutSharedChatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSharedChatsInput, UserUpdateWithoutSharedChatsInput>, UserUncheckedUpdateWithoutSharedChatsInput>
  }

  export type ConversationUpdateOneRequiredWithoutSharedChatNestedInput = {
    create?: XOR<ConversationCreateWithoutSharedChatInput, ConversationUncheckedCreateWithoutSharedChatInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutSharedChatInput
    upsert?: ConversationUpsertWithoutSharedChatInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutSharedChatInput, ConversationUpdateWithoutSharedChatInput>, ConversationUncheckedUpdateWithoutSharedChatInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    SharedChat?: SharedChatCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    SharedChat?: SharedChatUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
  }

  export type AssistantCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    instructions?: string | null
    model?: string
    temperature?: number
    icon?: string | null
    color?: string | null
    actions?: AssistantCreateactionsInput | string[]
    models?: AssistantCreatemodelsInput | string[]
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssistantUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    instructions?: string | null
    model?: string
    temperature?: number
    icon?: string | null
    color?: string | null
    actions?: AssistantCreateactionsInput | string[]
    models?: AssistantCreatemodelsInput | string[]
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssistantCreateOrConnectWithoutUserInput = {
    where: AssistantWhereUniqueInput
    create: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput>
  }

  export type AssistantCreateManyUserInputEnvelope = {
    data: AssistantCreateManyUserInput | AssistantCreateManyUserInput[]
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
    conversations?: ConversationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
  }

  export type SharedChatCreateWithoutCreatorInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutSharedChatInput
  }

  export type SharedChatUncheckedCreateWithoutCreatorInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    conversationId: string
  }

  export type SharedChatCreateOrConnectWithoutCreatorInput = {
    where: SharedChatWhereUniqueInput
    create: XOR<SharedChatCreateWithoutCreatorInput, SharedChatUncheckedCreateWithoutCreatorInput>
  }

  export type SharedChatCreateManyCreatorInputEnvelope = {
    data: SharedChatCreateManyCreatorInput | SharedChatCreateManyCreatorInput[]
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    modelId?: StringNullableFilter<"Conversation"> | string | null
    modelName?: StringNullableFilter<"Conversation"> | string | null
    isPinned?: BoolFilter<"Conversation"> | boolean
    assistantId?: StringNullableFilter<"Conversation"> | string | null
    isLocked?: BoolFilter<"Conversation"> | boolean
    activePath?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    userId?: StringFilter<"Conversation"> | string
    projectId?: StringNullableFilter<"Conversation"> | string | null
  }

  export type AssistantUpsertWithWhereUniqueWithoutUserInput = {
    where: AssistantWhereUniqueInput
    update: XOR<AssistantUpdateWithoutUserInput, AssistantUncheckedUpdateWithoutUserInput>
    create: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput>
  }

  export type AssistantUpdateWithWhereUniqueWithoutUserInput = {
    where: AssistantWhereUniqueInput
    data: XOR<AssistantUpdateWithoutUserInput, AssistantUncheckedUpdateWithoutUserInput>
  }

  export type AssistantUpdateManyWithWhereWithoutUserInput = {
    where: AssistantScalarWhereInput
    data: XOR<AssistantUpdateManyMutationInput, AssistantUncheckedUpdateManyWithoutUserInput>
  }

  export type AssistantScalarWhereInput = {
    AND?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
    OR?: AssistantScalarWhereInput[]
    NOT?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
    id?: StringFilter<"Assistant"> | string
    name?: StringFilter<"Assistant"> | string
    description?: StringNullableFilter<"Assistant"> | string | null
    instructions?: StringNullableFilter<"Assistant"> | string | null
    model?: StringFilter<"Assistant"> | string
    temperature?: FloatFilter<"Assistant"> | number
    icon?: StringNullableFilter<"Assistant"> | string | null
    color?: StringNullableFilter<"Assistant"> | string | null
    actions?: StringNullableListFilter<"Assistant">
    models?: StringNullableListFilter<"Assistant">
    isPublic?: BoolFilter<"Assistant"> | boolean
    createdAt?: DateTimeFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeFilter<"Assistant"> | Date | string
    userId?: StringFilter<"Assistant"> | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    instructions?: StringNullableFilter<"Project"> | string | null
    color?: StringNullableFilter<"Project"> | string | null
    icon?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    chatIds?: StringNullableListFilter<"Project">
    chatDetails?: JsonNullableFilter<"Project">
  }

  export type SharedChatUpsertWithWhereUniqueWithoutCreatorInput = {
    where: SharedChatWhereUniqueInput
    update: XOR<SharedChatUpdateWithoutCreatorInput, SharedChatUncheckedUpdateWithoutCreatorInput>
    create: XOR<SharedChatCreateWithoutCreatorInput, SharedChatUncheckedCreateWithoutCreatorInput>
  }

  export type SharedChatUpdateWithWhereUniqueWithoutCreatorInput = {
    where: SharedChatWhereUniqueInput
    data: XOR<SharedChatUpdateWithoutCreatorInput, SharedChatUncheckedUpdateWithoutCreatorInput>
  }

  export type SharedChatUpdateManyWithWhereWithoutCreatorInput = {
    where: SharedChatScalarWhereInput
    data: XOR<SharedChatUpdateManyMutationInput, SharedChatUncheckedUpdateManyWithoutCreatorInput>
  }

  export type SharedChatScalarWhereInput = {
    AND?: SharedChatScalarWhereInput | SharedChatScalarWhereInput[]
    OR?: SharedChatScalarWhereInput[]
    NOT?: SharedChatScalarWhereInput | SharedChatScalarWhereInput[]
    id?: StringFilter<"SharedChat"> | string
    shareToken?: StringFilter<"SharedChat"> | string
    isPublic?: BoolFilter<"SharedChat"> | boolean
    isUsed?: BoolFilter<"SharedChat"> | boolean
    usedBy?: StringNullableFilter<"SharedChat"> | string | null
    expiresAt?: DateTimeNullableFilter<"SharedChat"> | Date | string | null
    creatorId?: StringFilter<"SharedChat"> | string
    createdAt?: DateTimeFilter<"SharedChat"> | Date | string
    conversationId?: StringFilter<"SharedChat"> | string
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    assistants?: AssistantCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    assistants?: AssistantUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type ProjectCreateWithoutConversationsInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutConversationsInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
  }

  export type ProjectCreateOrConnectWithoutConversationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    reasoning?: string | null
    modelName?: string | null
    parentId?: string | null
    siblingIds?: MessageCreatesiblingIdsInput | string[]
    version?: number
    attachmentName?: string | null
    attachmentType?: string | null
    sources?: InputJsonValue | null
    rating?: string | null
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    reasoning?: string | null
    modelName?: string | null
    parentId?: string | null
    siblingIds?: MessageCreatesiblingIdsInput | string[]
    version?: number
    attachmentName?: string | null
    attachmentType?: string | null
    sources?: InputJsonValue | null
    rating?: string | null
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
  }

  export type SharedChatCreateWithoutConversationInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutSharedChatsInput
  }

  export type SharedChatUncheckedCreateWithoutConversationInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    creatorId: string
    createdAt?: Date | string
  }

  export type SharedChatCreateOrConnectWithoutConversationInput = {
    where: SharedChatWhereUniqueInput
    create: XOR<SharedChatCreateWithoutConversationInput, SharedChatUncheckedCreateWithoutConversationInput>
  }

  export type SharedChatCreateManyConversationInputEnvelope = {
    data: SharedChatCreateManyConversationInput | SharedChatCreateManyConversationInput[]
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assistants?: AssistantUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assistants?: AssistantUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ProjectUpsertWithoutConversationsInput = {
    update: XOR<ProjectUpdateWithoutConversationsInput, ProjectUncheckedUpdateWithoutConversationsInput>
    create: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutConversationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutConversationsInput, ProjectUncheckedUpdateWithoutConversationsInput>
  }

  export type ProjectUpdateWithoutConversationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutConversationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    reasoning?: StringNullableFilter<"Message"> | string | null
    modelName?: StringNullableFilter<"Message"> | string | null
    parentId?: StringNullableFilter<"Message"> | string | null
    siblingIds?: StringNullableListFilter<"Message">
    version?: IntFilter<"Message"> | number
    attachmentName?: StringNullableFilter<"Message"> | string | null
    attachmentType?: StringNullableFilter<"Message"> | string | null
    sources?: JsonNullableFilter<"Message">
    rating?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversationId?: StringFilter<"Message"> | string
  }

  export type SharedChatUpsertWithWhereUniqueWithoutConversationInput = {
    where: SharedChatWhereUniqueInput
    update: XOR<SharedChatUpdateWithoutConversationInput, SharedChatUncheckedUpdateWithoutConversationInput>
    create: XOR<SharedChatCreateWithoutConversationInput, SharedChatUncheckedCreateWithoutConversationInput>
  }

  export type SharedChatUpdateWithWhereUniqueWithoutConversationInput = {
    where: SharedChatWhereUniqueInput
    data: XOR<SharedChatUpdateWithoutConversationInput, SharedChatUncheckedUpdateWithoutConversationInput>
  }

  export type SharedChatUpdateManyWithWhereWithoutConversationInput = {
    where: SharedChatScalarWhereInput
    data: XOR<SharedChatUpdateManyMutationInput, SharedChatUncheckedUpdateManyWithoutConversationInput>
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    project?: ProjectCreateNestedOneWithoutConversationsInput
    SharedChat?: SharedChatCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    projectId?: string | null
    SharedChat?: SharedChatUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    SharedChat?: SharedChatUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    SharedChat?: SharedChatUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type UserCreateWithoutAssistantsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutAssistantsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutAssistantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
  }

  export type UserUpsertWithoutAssistantsInput = {
    update: XOR<UserUpdateWithoutAssistantsInput, UserUncheckedUpdateWithoutAssistantsInput>
    create: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssistantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssistantsInput, UserUncheckedUpdateWithoutAssistantsInput>
  }

  export type UserUpdateWithoutAssistantsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutAssistantsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    assistants?: AssistantCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    assistants?: AssistantUncheckedCreateNestedManyWithoutUserInput
    sharedChats?: SharedChatUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ConversationCreateWithoutProjectInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    SharedChat?: SharedChatCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutProjectInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    SharedChat?: SharedChatUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutProjectInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput>
  }

  export type ConversationCreateManyProjectInputEnvelope = {
    data: ConversationCreateManyProjectInput | ConversationCreateManyProjectInput[]
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    assistants?: AssistantUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    assistants?: AssistantUncheckedUpdateManyWithoutUserNestedInput
    sharedChats?: SharedChatUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ConversationUpsertWithWhereUniqueWithoutProjectInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutProjectInput, ConversationUncheckedUpdateWithoutProjectInput>
    create: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutProjectInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutProjectInput, ConversationUncheckedUpdateWithoutProjectInput>
  }

  export type ConversationUpdateManyWithWhereWithoutProjectInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserCreateWithoutSharedChatsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    assistants?: AssistantCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSharedChatsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    plan?: string
    tokens?: number
    tokenResetDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    assistants?: AssistantUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSharedChatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSharedChatsInput, UserUncheckedCreateWithoutSharedChatsInput>
  }

  export type ConversationCreateWithoutSharedChatInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutSharedChatInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    projectId?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutSharedChatInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutSharedChatInput, ConversationUncheckedCreateWithoutSharedChatInput>
  }

  export type UserUpsertWithoutSharedChatsInput = {
    update: XOR<UserUpdateWithoutSharedChatsInput, UserUncheckedUpdateWithoutSharedChatsInput>
    create: XOR<UserCreateWithoutSharedChatsInput, UserUncheckedCreateWithoutSharedChatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSharedChatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSharedChatsInput, UserUncheckedUpdateWithoutSharedChatsInput>
  }

  export type UserUpdateWithoutSharedChatsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    assistants?: AssistantUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSharedChatsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    tokens?: IntFieldUpdateOperationsInput | number
    tokenResetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    assistants?: AssistantUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConversationUpsertWithoutSharedChatInput = {
    update: XOR<ConversationUpdateWithoutSharedChatInput, ConversationUncheckedUpdateWithoutSharedChatInput>
    create: XOR<ConversationCreateWithoutSharedChatInput, ConversationUncheckedCreateWithoutSharedChatInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutSharedChatInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutSharedChatInput, ConversationUncheckedUpdateWithoutSharedChatInput>
  }

  export type ConversationUpdateWithoutSharedChatInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutSharedChatInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId?: string | null
  }

  export type AssistantCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    instructions?: string | null
    model?: string
    temperature?: number
    icon?: string | null
    color?: string | null
    actions?: AssistantCreateactionsInput | string[]
    models?: AssistantCreatemodelsInput | string[]
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    instructions?: string | null
    color?: string | null
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatIds?: ProjectCreatechatIdsInput | string[]
    chatDetails?: InputJsonValue | null
  }

  export type SharedChatCreateManyCreatorInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    conversationId: string
  }

  export type ConversationUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    SharedChat?: SharedChatUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    SharedChat?: SharedChatUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AssistantUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantUncheckedUpdateManyWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: AssistantUpdateactionsInput | string[]
    models?: AssistantUpdatemodelsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
    conversations?: ConversationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
    conversations?: ConversationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatIds?: ProjectUpdatechatIdsInput | string[]
    chatDetails?: InputJsonValue | InputJsonValue | null
  }

  export type SharedChatUpdateWithoutCreatorInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutSharedChatNestedInput
  }

  export type SharedChatUncheckedUpdateWithoutCreatorInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type SharedChatUncheckedUpdateManyWithoutCreatorInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    reasoning?: string | null
    modelName?: string | null
    parentId?: string | null
    siblingIds?: MessageCreatesiblingIdsInput | string[]
    version?: number
    attachmentName?: string | null
    attachmentType?: string | null
    sources?: InputJsonValue | null
    rating?: string | null
    createdAt?: Date | string
  }

  export type SharedChatCreateManyConversationInput = {
    id?: string
    shareToken: string
    isPublic?: boolean
    isUsed?: boolean
    usedBy?: string | null
    expiresAt?: Date | string | null
    creatorId: string
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    siblingIds?: MessageUpdatesiblingIdsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: InputJsonValue | InputJsonValue | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedChatUpdateWithoutConversationInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutSharedChatsNestedInput
  }

  export type SharedChatUncheckedUpdateWithoutConversationInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedChatUncheckedUpdateManyWithoutConversationInput = {
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyProjectInput = {
    id?: string
    title?: string
    modelId?: string | null
    modelName?: string | null
    isPinned?: boolean
    assistantId?: string | null
    isLocked?: boolean
    activePath?: ConversationCreateactivePathInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ConversationUpdateWithoutProjectInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    SharedChat?: SharedChatUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutProjectInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    SharedChat?: SharedChatUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutProjectInput = {
    title?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    modelName?: NullableStringFieldUpdateOperationsInput | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    assistantId?: NullableStringFieldUpdateOperationsInput | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    activePath?: ConversationUpdateactivePathInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}